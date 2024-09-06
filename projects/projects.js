// components.js

class ProjectDetail extends HTMLElement {
  connectedCallback() {
      this.innerHTML = `
          <div class="wrap">
              <div class="container">   
                  <div class="project-header">
                      <!-- Slot for the project title (individual pages will provide this) -->
                      <slot name="title"></slot>
                  </div>

                  <div class="project-content">
                      <!-- Slot for the project content (like description, images, etc.) -->
                      <slot name="content"></slot>
                  </div>

                  <a class="return-home" href="../index.html">
                      <svg width="92" height="92" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="46" cy="46" r="43.5" stroke="#202020" stroke-width="5"/>
                          <rect x="26" y="45.5355" width="5" height="22" transform="rotate(-45 26 45.5355)" fill="#202020"/>
                          <rect x="41.5566" y="30" width="5" height="22" transform="rotate(45 41.5566 30)" fill="#202020"/>
                          <rect x="32" y="48" width="5" height="33" transform="rotate(-90 32 48)" fill="#202020"/>
                      </svg>
                  </a>

                  <!-- Navigation for next/previous items (optional) -->
                  <div class="next-item-holder item-list">
                      <slot name="navigation"></slot> <!-- Custom navigation if needed -->
                  </div>
              </div>

              <footer id="footer" class="">
                  <p>©2024 Lamain Islam All Rights Reserved</p>
                  <p class="footer-right">Designed by Lamain Islam</p>
              </footer>
          </div>
      `;
  }
}

// Register the Web Component
customElements.define('project-detail', ProjectDetail);

