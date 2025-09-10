export default async function handler(req, res) {
  try {
    let inputPath = "";

    if (req.method === "POST") {
      let body = "";
      req.on("data", chunk => body += chunk);
      req.on("end", () => {
        const params = new URLSearchParams(body);
        inputPath = params.get("text") || "";

        if (!inputPath.trim()) {
          return res.status(200).json({
            response_type: "ephemeral",
            text: "⚠️ No path provided. Usage: `/convert [filepath]`"
          });
        }

        let winPath = inputPath;
        if (inputPath.startsWith("/Volumes/")) winPath = inputPath.replace(/^\/Volumes\//, "//gus/");
        winPath = winPath.replace(/\//g, "\\");

        res.setHeader("Content-Type", "application/json");
        return res.status(200).json({
          response_type: "ephemeral",
          text: `➡️ ${winPath}`
        });
      });
    } else {
      return res.status(200).json({ text: "Use POST with Slack slash command" });
    }
  } catch (err) {
    console.error(err);
    return res.status(200).json({
      response_type: "ephemeral",
      text: "❌ Error converting path"
    });
  }
}
