export default function handler(req, res) {
  let inputPath = "";

  // Slack sends the "text" param with whatever you type after the command
  if (req.body && typeof req.body === "object") {
    inputPath = req.body.text || "";
  } else if (req.query.text) {
    inputPath = req.query.text;
  }

  // Conversion logic
  let winPath = inputPath;

  // Rule 1: Replace /Volumes/ with //gus/
  if (inputPath.startsWith("/Volumes/")) {
    winPath = inputPath.replace(/^\/Volumes\//, "//gus/");
  }

  // (Optional) If you also want to flip forward slashes into backslashes
  // you could uncomment this:
  winPath = winPath.replace(/\//g, "\\");

  res.status(200).json({
    response_type: "ephemeral", // private reply
    text: `➡️ ${winPath}`
  });
}
