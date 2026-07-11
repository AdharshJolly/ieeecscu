import assert from 'node:assert';
import { authorize } from '../src/lib/auth';

// We mock the NEXTAUTH_SECRET check by setting it before importing anything, 
// but since the import already happened, let's just make sure we set env vars 
// before running the test scenarios.

// A helper function to run all tests
async function runTests() {
  console.log("Running auth tests...");
  let passed = 0;
  let failed = 0;

  // Save original env
  const originalAdminUser = process.env.ADMIN_USERNAME;
  const originalAdminPass = process.env.ADMIN_PASSWORD;

  function setEnv(user: string | undefined, pass: string | undefined) {
    if (user === undefined) delete process.env.ADMIN_USERNAME;
    else process.env.ADMIN_USERNAME = user;

    if (pass === undefined) delete process.env.ADMIN_PASSWORD;
    else process.env.ADMIN_PASSWORD = pass;
  }

  try {
    // Test 1: Successful login
    setEnv("admin", "secret123");
    const result1 = await authorize({ username: "admin", password: "secret123" });
    assert.deepStrictEqual(result1, { id: "1", name: "Admin" });
    console.log("✅ Test 1 Passed: Successful login");
    passed++;
  } catch (e: any) {
    console.error("❌ Test 1 Failed: Successful login", e.message);
    failed++;
  }

  try {
    // Test 2: Wrong credentials
    setEnv("admin", "secret123");
    const result2 = await authorize({ username: "admin", password: "wrongpassword" });
    assert.strictEqual(result2, null);
    console.log("✅ Test 2 Passed: Wrong credentials");
    passed++;
  } catch (e: any) {
    console.error("❌ Test 2 Failed: Wrong credentials", e.message);
    failed++;
  }

  try {
    // Test 3: Missing credentials payload
    setEnv("admin", "secret123");
    const result3 = await authorize(undefined);
    assert.strictEqual(result3, null);
    console.log("✅ Test 3 Passed: Missing credentials payload");
    passed++;
  } catch (e: any) {
    console.error("❌ Test 3 Failed: Missing credentials payload", e.message);
    failed++;
  }

  try {
    // Test 4: Missing environment variables
    setEnv(undefined, undefined);
    const result4 = await authorize({ username: "admin", password: "secret123" });
    assert.strictEqual(result4, null);
    console.log("✅ Test 4 Passed: Missing environment variables");
    passed++;
  } catch (e: any) {
    console.error("❌ Test 4 Failed: Missing environment variables", e.message);
    failed++;
  }

  try {
    // Test 5: Missing environment variables and undefined payload (the security fix case)
    setEnv(undefined, undefined);
    // Cast to bypass TS complaining about missing props if we just pass {}
    const result5 = await authorize({} as any); 
    assert.strictEqual(result5, null);
    console.log("✅ Test 5 Passed: Security bypass (missing env + undefined payload credentials)");
    passed++;
  } catch (e: any) {
    console.error("❌ Test 5 Failed: Security bypass", e.message);
    failed++;
  }

  // Restore env
  setEnv(originalAdminUser, originalAdminPass);

  console.log(`\nTests completed: ${passed} passed, ${failed} failed.`);
  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
