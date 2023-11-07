import PhotoList from "../../components/PhotoList";

const PhotoListExample = () => {
  return (
    <div>
      <PhotoList
        photos={[
          {
            url: "https://img.alicdn.com/imgextra/i4/2215303353339/O1CN01VY1jcw1aXJL8LNRKa_!!2215303353339.jpg",
            imgSrc:
              "https://img.alicdn.com/imgextra/i4/2215303353339/O1CN01VY1jcw1aXJL8LNRKa_!!2215303353339.jpg",
            description: "Test Passing",
          },
        ]}
      />
    </div>
  );
};

export default PhotoListExample;
