
import request from 'request';
import cheerio from 'cheerio';
import chalk from 'chalk';

const inputurl = process.argv[2];
const allLinks = [];


const gettingDomain = u => {
    if (u.substring(0, 8) == 'https://') {
        u = u.substring(8);
    }

    if (u.substring(0, 7) == 'http://') {
        u = u.substring(7);
    }

    for (let i = 0; i < u.length; i++) {
        if (u[i] == '/') {
            u = u.substring(0, i);
            break;
        }
    }

    return u;

}

console.log(chalk.green("Greetings from"), chalk.green.underline.bold("SOVA_WebCrawler"));
console.log(chalk.hex('#DEADff').bold('Please wait while we are crawling your URL'));


let urlstr = 'https://' + gettingDomain(inputurl);
request(urlstr, cb);
function cb(error, response, html) {
    if (error) {
        console.error(chalk.red('Error occuured! please enter valid URL or check your internet connection')); // Print the error if one occurred
    } else {
        handlehtml(html);
    }
}

function handlehtml(html) {
    let $ = cheerio.load(html);
    let a = $("a");
    for (let i = 0; i < a.length; i++) {
        let urltext = $(a[i]).text();
        let href = $(a[i]).attr('href');

        if (urltext != "") {
            allLinks.push({ text: urltext, href: href })
        }
    }


    console.log(`${chalk.yellowBright('Domain name of your URL is')} ${chalk.yellow.underline.bold(gettingDomain(inputurl))}`);
    const numoflinks = allLinks.length;
    console.log(`We have found ${numoflinks} on the hmoe page of URL ${inputurl} `);
    for (a of allLinks) {
        console.log(a['text'], chalk.hex('#DEADED').bold.underline(`${a['href']}`));
    }

}
