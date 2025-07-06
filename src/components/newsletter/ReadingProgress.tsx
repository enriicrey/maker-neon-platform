
interface ReadingProgressProps {
  progress: number;
}

const ReadingProgress = ({ progress }: ReadingProgressProps) => {
  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-dark-surface z-50">
      <div 
        className="h-full bg-primary transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ReadingProgress;
