const Icon = ({ icon }: { icon: string }) => {
  return (
    <svg>
      <use xlinkHref={`./sprite.svg#${icon}`} />;
    </svg>
  );
};

export default Icon;
