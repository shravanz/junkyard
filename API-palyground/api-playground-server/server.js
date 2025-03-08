const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Store mock APIs with multiple methods per path
const mockAPIs = {};

function registerMockRoute(path, method, response) {
  // Remove existing route for the same path-method combination
  app._router.stack = app._router.stack.filter(
    (layer) =>
      !(
        layer.route &&
        layer.route.path === path &&
        layer.route.methods[method.toLowerCase()]
      )
  );

  // Register new route
  app[method.toLowerCase()](path, (req, res) => {
    let finalResponse = response;
    if (req.query && Object.keys(req.query).length > 0) {
      finalResponse = { ...response, queryParams: req.query };
    }
    res.json(finalResponse);
  });

  console.log(`✔ Mock API registered: ${method.toUpperCase()} ${path}`);
}

// Create a new mock API
app.post("/create-mock", (req, res) => {
  const { method, path, response } = req.body;
  if (!method || !path || !response) {
    return res
      .status(400)
      .json({ error: "Method, path, and response are required" });
  }

  const upperMethod = method.toUpperCase();

  // Check if the same path with the same method already exists
  if (mockAPIs[path] && mockAPIs[path][upperMethod]) {
    return res
      .status(400)
      .json({ error: `Path already created with this method.` });
  }

  // Initialize path if not exists
  if (!mockAPIs[path]) {
    mockAPIs[path] = {};
  }

  mockAPIs[path][upperMethod] = response;
  registerMockRoute(path, upperMethod, response);
  res.json({ message: `Mock API created at ${path} [${upperMethod}]` });
});

// Get all registered mock APIs
app.get("/mock-apis", (req, res) => {
  res.json(mockAPIs);
});

// Delete a mock API
app.delete("/delete-mock", (req, res) => {
  const { path, method } = req.body;
  if (!path || !mockAPIs[path]) {
    return res
      .status(400)
      .json({ error: `Mock API at ${path} does not exist` });
  }

  const upperMethod = method ? method.toUpperCase() : null;

  if (upperMethod && mockAPIs[path][upperMethod]) {
    delete mockAPIs[path][upperMethod];

    // Remove the specific method from Express router stack
    app._router.stack = app._router.stack.filter(
      (layer) =>
        !(
          layer.route &&
          layer.route.path === path &&
          layer.route.methods[upperMethod.toLowerCase()]
        )
    );

    console.log(`❌ Mock API deleted: ${upperMethod} ${path}`);
    return res.json({
      message: `Mock API at ${path} [${upperMethod}] deleted successfully`,
    });
  }

  // If no method is provided, delete the entire path
  delete mockAPIs[path];

  // Remove all methods for this path from Express router stack
  app._router.stack = app._router.stack.filter(
    (layer) => !(layer.route && layer.route.path === path)
  );

  console.log(`❌ All Mock APIs deleted for path: ${path}`);
  res.json({ message: `All Mock APIs at ${path} deleted successfully` });
});

// Start server
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
