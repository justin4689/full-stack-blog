import { Link } from "react-router-dom";
import Image from "./Image";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";
import { FeaturedPostsSkeleton } from "./Skeleton";

const FeaturedPosts = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: async () => {
      const res = await axios.get("/posts?featured=true&limit=4&sort=newest");
      return res.data;
    },
  });

  if (isPending) return <FeaturedPostsSkeleton />;
  if (error) return null;

  const posts = data.posts;
  if (!posts || posts.length === 0) return null;

  return (
    <div className="mt-8 flex flex-col lg:flex-row gap-8">
      {/* First */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {posts[0].img && (
          <Image src={posts[0].img} className="rounded-3xl object-cover" w="895" />
        )}
        <div className="flex items-center gap-4">
          <h1 className="font-semibold lg:text-lg">01.</h1>
          <Link className="text-blue-800 lg:text-lg">{posts[0].category}</Link>
          <span className="text-gray-500">{format(posts[0].createdAt)}</span>
        </div>
        <Link to={posts[0].slug} className="text-xl lg:text-3xl font-semibold lg:font-bold">
          {posts[0].title}
        </Link>
      </div>
      {/* Others */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {[1, 2, 3].map((i) =>
          posts[i] ? (
            <div key={i} className="lg:h-1/3 flex justify-between gap-4">
              {posts[i].img && (
                <div className="w-1/3 aspect-video">
                  <Image
                    src={posts[i].img}
                    className="rounded-3xl object-cover w-full h-full"
                    w="298"
                  />
                </div>
              )}
              <div className="w-2/3">
                <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
                  <h1 className="font-semibold">0{i + 1}.</h1>
                  <Link className="text-blue-800">{posts[i].category}</Link>
                  <span className="text-gray-500 text-sm">{format(posts[i].createdAt)}</span>
                </div>
                <Link
                  to={posts[i].slug}
                  className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
                >
                  {posts[i].title}
                </Link>
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default FeaturedPosts;
