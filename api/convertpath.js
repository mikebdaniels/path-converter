export default async function handler(req, res) {
  try {
    let inputPath = "";

    if (req.method === "POST") {
      // Vercel-friendly way to get the raw body
      const bodyText = await req.text();
      const params = new URLSearchParams(bodyText);
      inputPath = params.get("text") || "";
    } else if (req.method === "GET") {
      inputPath = req.query.text || "";
    }

    if (!inputPath.trim()) {
      return res.status(200).json({
        response_type: "ephemeral",
        text: "⚠️ No path provided. Usage: `/convertpath [filepath]`"
      });
    }

    let winPath = inputPath;

    if (inputPath.startsWith("/Volumes/")) {
      winPath = inputPath.replace(/^\/Volumes\//, "//gus/");
    }

    winPath = winPath.replace(/\//g, "\\");

    res.setHeader("Content-Type", "application/json");
    return res.status(200).json({
      response_type: "ephemeral",
      text: `➡️ ${winPath}`
    });

  } catch (err) {
    console.error("Error in /convertpath:", err);
    return res.status(200).json({
      response_type: "ephemeral",
      text: "❌ Something went wrong while converting the path."
    });
  }
}
