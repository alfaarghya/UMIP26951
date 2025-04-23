const Avatar = ({ username }: { username: string }) => {
  return (
    <div className="cursor-pointer relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-400 rounded-full mr-2">
      <span className="text-lg text-gray-600">{username[0]}</span>
    </div>
  );
};

export default Avatar;
