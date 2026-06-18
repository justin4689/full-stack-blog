const SkeletonBox = ({ className }) => (
  <div className={`bg-gray-200 animate-pulse rounded-xl ${className}`} />
);

export const PostListSkeleton = () => (
  <div className="flex flex-col gap-12">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex flex-col xl:flex-row gap-8 mb-4">
        <SkeletonBox className="xl:w-1/3 h-48 rounded-2xl" />
        <div className="flex flex-col gap-4 xl:w-2/3">
          <SkeletonBox className="h-8 w-3/4" />
          <SkeletonBox className="h-4 w-1/3" />
          <SkeletonBox className="h-4 w-full" />
          <SkeletonBox className="h-4 w-5/6" />
          <SkeletonBox className="h-4 w-16" />
        </div>
      </div>
    ))}
  </div>
);

export const FeaturedPostsSkeleton = () => (
  <div className="mt-8 flex flex-col lg:flex-row gap-8">
    <div className="w-full lg:w-1/2 flex flex-col gap-4">
      <SkeletonBox className="h-72 rounded-3xl" />
      <SkeletonBox className="h-4 w-1/4" />
      <SkeletonBox className="h-7 w-3/4" />
    </div>
    <div className="w-full lg:w-1/2 flex flex-col gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-4">
          <SkeletonBox className="w-1/3 aspect-video rounded-3xl" />
          <div className="w-2/3 flex flex-col gap-3">
            <SkeletonBox className="h-4 w-1/2" />
            <SkeletonBox className="h-5 w-full" />
            <SkeletonBox className="h-5 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const SinglePostSkeleton = () => (
  <div className="flex flex-col gap-8">
    <div className="flex gap-8">
      <div className="lg:w-3/5 flex flex-col gap-6">
        <SkeletonBox className="h-10 w-full" />
        <SkeletonBox className="h-10 w-3/4" />
        <SkeletonBox className="h-4 w-1/2" />
        <SkeletonBox className="h-4 w-full" />
        <SkeletonBox className="h-4 w-5/6" />
      </div>
      <SkeletonBox className="hidden lg:block w-2/5 h-64 rounded-2xl" />
    </div>
    <div className="flex flex-col gap-4 lg:w-3/5">
      {[1, 2, 3, 4, 5].map((i) => (
        <SkeletonBox key={i} className="h-4 w-full" />
      ))}
    </div>
  </div>
);

export const CommentsSkeleton = () => (
  <div className="flex flex-col gap-6 lg:w-3/5">
    {[1, 2, 3].map((i) => (
      <div key={i} className="p-4 flex flex-col gap-3">
        <div className="flex items-center gap-4">
          <SkeletonBox className="w-10 h-10 rounded-full" />
          <SkeletonBox className="h-4 w-24" />
          <SkeletonBox className="h-4 w-16" />
        </div>
        <SkeletonBox className="h-4 w-full" />
        <SkeletonBox className="h-4 w-3/4" />
      </div>
    ))}
  </div>
);
