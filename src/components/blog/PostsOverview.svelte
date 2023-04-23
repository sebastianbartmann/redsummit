<script lang="ts">
  import type { Post } from "@pages/blog/posts/post";
  let posts: Array<Post>;
  posts = [
    {
      title: "sleep better with active gcp services",
      slug: "architecture/gcp/sleep-better-with-active-gcp-services",
      creation_date: "2023-03-11",
      category: "principles",
    },
    {
      title: "have a basic structure",
      slug: "principles/have-a-basic-structure",
      creation_date: "2021-12-08",
      category: "principles",
    },
    {
      title: "how it started",
      slug: "how-it-started",
      creation_date: "2021-10-13",
      category: "personal",
    },
  ];
</script>

<div class="py-4 flex flex-col text-center">
  <ul class="posts">
    {#each posts as post}
      <li class="my-4">
        <a rel="prefetch" href="/blog/posts/{post.slug}">
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
