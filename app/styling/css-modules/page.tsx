'use client';

import styles from './styles.module.css';

const SkeletonCard = () => (
  <div className={styles.skeleton}>
    <div className={styles['skeleton-img']} />
    <div className={styles['skeleton-btn']} />
    <div className={styles['skeleton-line-one']} />
    <div className={styles['skeleton-line-two']} />
  </div>
);

export default function Page() {
  return (
    <div className="space-y-4">
      <div className="text-xl font-medium text-zinc-500">
        Styled with CSS Modules
      </div>
      <div className={styles.container}>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
      <a href="https://www.freepik.com/free-vector/pixel-robots-icons-8-bit-bots-isolated-set-robots-pixel-style-illustration-color-robot_13031467.htm#query=robot%20pixel%20art&position=0&from_view=keyword">
        Image by macrovector
      </a>
      on Freepik
    </div>
  );
}
