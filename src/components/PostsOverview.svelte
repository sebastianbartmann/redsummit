<script lang="ts">
  import type { Post } from "../pages/posts/post";
  let posts: Array<Post>;
  posts = [
    {
      title: "how it started",
      slug: "how-it-started",
      creation_date: "2021-10-13",
      category: "personal",
    },
    {
      title: "have a basic structure",
      slug: "principles/have-a-basic-structure",
      creation_date: "2021-12-08",
      category: "principles",
    },
  ];
</script>

<div class="flex flex-col text-center">
  <ul class="posts">
    {#each posts as post}
      <li class="py-4">
        <a rel="prefetch" href="posts/{post.slug}">
          <h2 class="text-xl">
            {post.title}
          </h2>
          <div class="date">
            {post.creation_date}
          </div>
        </a>
      </li>
    {/each}
  </ul>
</div>
