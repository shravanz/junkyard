const express = require("express");
const cors = require("cors");
const deepEqual = require("fast-deep-equal"); // Import deep equality checker

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json()); // ✅ Using Express built-in JSON parser

// Middleware to catch malformed JSON errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res
      .status(400)
      .json({ error: "Invalid JSON format. Ensure double quotes are used." });
  }
  next();
});

const mockAPIs = {};

function registerMockRoute(path, method, response, expectedRequestBody) {
  // Remove any existing route with the same method and path
  app._router.stack = app._router.stack.filter(
    (layer) =>
      !(
        layer.route &&
        layer.route.path === path &&
        layer.route.methods[method.toLowerCase()]
      )
  );

  app[method.toLowerCase()](path, (req, res) => {
    try {
      if ((method === "POST" || method === "PUT") && expectedRequestBody) {
        if (!deepEqual(req.body, expectedRequestBody)) {
          return res.status(400).json({
            error: "Invalid request body. Expected a different body.",
            expected: expectedRequestBody,
            received: req.body,
          });
        }
      }
      res.json(response);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  });

  console.log(`✔ Mock API registered: ${method.toUpperCase()} ${path}`);
}

app.post("/create-mock", (req, res) => {
  const { method, path, response, requestBody } = req.body;

  console.log("🔹 Incoming Request Data:", req.body);

  if (!method || !path || !response) {
    return res
      .status(400)
      .json({ error: "Method, path, and response are required" });
  }

  const upperMethod = method.toUpperCase();

  if (mockAPIs[path] && mockAPIs[path][upperMethod]) {
    return res
      .status(400)
      .json({ error: "Path already created with this method." });
  }

  if (!mockAPIs[path]) {
    mockAPIs[path] = {};
  }

  mockAPIs[path][upperMethod] = { response, requestBody: requestBody || {} };
  registerMockRoute(path, upperMethod, response, requestBody || {});

  console.log("🔹 Stored Mock APIs:", JSON.stringify(mockAPIs, null, 2));
  res.json({ message: `Mock API created at ${path} [${upperMethod}]` });
});

app.get("/mock-apis", (req, res) => {
  res.json(mockAPIs);
});

app.delete("/delete-mock", (req, res) => {
  const { path, method } = req.body;

  if (!mockAPIs[path] || !mockAPIs[path][method]) {
    return res.status(404).json({ error: "Mock API not found" });
  }

  delete mockAPIs[path][method];

  if (Object.keys(mockAPIs[path]).length === 0) {
    delete mockAPIs[path];
  }

  console.log(`❌ Mock API deleted: ${method.toUpperCase()} ${path}`);
  res.json({
    message: `Mock API deleted at ${path} [${method.toUpperCase()}]`,
  });
});

app
  .listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`❌ Port ${PORT} is already in use!`);
      process.exit(1);
    } else {
      console.error("❌ Server error:", err);
    }
  });
