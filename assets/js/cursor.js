const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
});

// Ring follows with lerp lag effect
function animRing() {
  rx += (mx - rx) * 0.016;
  ry += (my - ry) * 0.016;
  ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
  requestAnimationFrame(animRing);
}
animRing();

// Expand on hoverable elements — delegation handles dynamically added nodes
document.addEventListener("mouseover", (e) => {
  if (e.target.closest("a, button")) {
    cursor.style.width = "16px";
    cursor.style.height = "16px";
    ring.style.width = "60px";
    ring.style.height = "60px";
  }
});

document.addEventListener("mouseout", (e) => {
  if (e.target.closest("a, button")) {
    cursor.style.width = "8px";
    cursor.style.height = "8px";
    ring.style.width = "36px";
    ring.style.height = "36px";
  }
});
