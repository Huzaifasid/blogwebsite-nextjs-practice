// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// http://localhost:3000/api/getblog?slug=huzaifa
import * as fs from "fs";
export default function handler(req, res) {
  const setSlug = req.query.slug;
  fs.readFile(`blogdata/${setSlug}.json`, "utf-8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "No Such Blog Found" });
    }
    const result = JSON.parse(data);
    res.status(200).json(result);
  });
}
