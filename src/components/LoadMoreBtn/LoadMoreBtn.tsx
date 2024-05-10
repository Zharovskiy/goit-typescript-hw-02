import css from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onLoadMore: () => void;
}

const LoadMoreBtn = ({ onLoadMore }: LoadMoreBtnProps) => {
  return (
    <button className={css.button} type="button" onClick={onLoadMore}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
