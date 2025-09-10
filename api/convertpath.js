export default async function handler(req, res) {
  try {
    let inputPath = "";

    if (req.method === "POST") {
      // Parse x-www-form-urlencoded manually
      const body = await new Promise((resolve) => {
        let data = "";
        req.on("data", chunk => { data += chunk; });
        req.on("end", () => resolve(data));
      });

      const params = new URLSearchParams(body);
      inputPath = params.get("text") || "";
    } else if (req.method === "GET") {
      inputPath = req.query.text || "";
    }

    // Handle empty input
    if (!inputPath.trim()) {
      return res.status(200).json({
        response_type: "ephemeral",
        text: "⚠️ No path provided. Usage: `/convert [filepath]`"
      });
    }

    // Conversion logic
    let winPath = inputPath;
    if (inputPath.startsWith("/Volumes/")) {
      winPath = inputPath.replace(/^\/Volumes\//, "//gus/");
    }
    winPath = winPath.replace(/\//g, "\\");

    return res.status(200).json({
      response_type: "ephemeral",
      text: `➡️ ${winPath}`
    });

  } catch (error) {
    console.error("Error in /convert:", error);
    return res.status(200).json({
      response_type: "ephemeral",
      text: "❌ Something went wrong while converting the path."
    });
  }
}
