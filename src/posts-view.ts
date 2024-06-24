import './style.css';
import './posts.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="container">
  <section>
  <nav>
   <button>< previous</button>
   <h2>Post title</h2>
   <button>next ></button>
  </nav>
  <p class="post-desc"> Post description</p>
    </section>
      <section>
      <button> View Comments </button>
      <p class="comments">Comments of current post go here</p>
  </section>
  </div>
`;
