import { auth } from "/js/firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  if (!user) { location.href = "/admin/"; return; }
  document.getElementById("adminUser").textContent = "Giriş yapan: " + user.email;
});

document.getElementById("logoutBtn").addEventListener("click", async () => {
  await signOut(auth);
  location.href = "/admin/";
});
