export default function handler(req, res) {
  try {
    // Get input text from Slack
    let inputPath = "";

    if (req.body && typeof req.body === "object") {
      inputPath = req.body.text || "";
    } else if (req.query.text) {
      inputPath = req.query.text;
    }

    // Handle empty input
    if (!inputPath || inputPath.trim() === "") {
      return res.status(200).json({
        response_type: "ephemeral",
        text: "⚠️ No path provided. Usage: `/convert [filepath]`"
      });
    }

    // Conversion logic
    let winPath = inputPath;

    // Rule 1: Replace /Volumes/ with //gus/
    if (inputPath.startsWith("/Volumes/")) {
      winPath = inputPath.replace(/^\/Volumes\//, "//gus/");
    }

    // Rule 2: Convert all remaining forward slashes into backslashes
    winPath = winPath.replace(/\//g, "\\");

    // Respond to Slack
    return res.status(200).json({
      response_type: "ephemeral", // private reply
      text: `➡️ ${winPath}`
    });

  } catch (error) {
    // Catch any unexpected errors to avoid dispatch_failed
    console.error("Error in /convert:", error);
    return res.status(200).json({
      response_type: "ephemeral",
      text: "❌ Something went wrong while converting the path."
    });
  }
}
