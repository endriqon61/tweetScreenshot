const puppeteer = require("puppeteer");
import { TweetInterface } from "../prettify-react/src/interfaces/interfaces";
const express = require("express");
const app = express();

app.use(express.json());


app.get("/getPicture", async(req, res ) => {
    const { url } = req.query
	console.log("yo this is url", url, "ye", req.query)
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url);
	await page.waitForSelector('.picture-container');
	const container = await page.$('.picture-container')	
	const image = await container.screenshot()
	console.log("yo this is image")
	await browser.close()
})

app.post("/getTweet", async (req, res) => {
  const { url } = req.body;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector('article')
  const tweet: TweetInterface = await page.evaluate(() => {
    const $ = (selector: string): HTMLElement | null =>
      document.querySelector(selector);
	if(!$('article > div > div > div > div:nth-child(3) > div:nth-child(5)')){
			return {
					name: "John\n@JohnDoe",
					checkmark: false,
					text: "It seems you are unauthorized to view this tweet",
					likes: "10000 likes 10000 retweets 10000 comments",
					date: `${() => new Date()}`,
					avatar: ""
			}
	}	
    return {
      name: $('[data-testid="User-Names"]')?.innerText || "",
      checkmark: $('article [data-testid="User-Names"] svg') ? true : false,
      text: $('article [data-testid="tweetText"]')!?.innerText || "",
      likes:
        $('article > div > div > div > div:nth-child(3) > div:nth-child(6)')!?.innerText || "",
      date: $('article > div > div > div > div:nth-child(3) > div:nth-child(5)')!?.innerText || "",
      avatar:$('article img')!?.getAttribute('src') || "",
    };
  });
  await browser.close()
  res.json({ data: tweet , message: "fuck you"}).status(200);
});

app.listen(8080, () => {
  console.log("server is listening");
});
