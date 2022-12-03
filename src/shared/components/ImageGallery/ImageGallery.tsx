import { ImageList, ImageListItem } from "@mui/material";

interface IProps {
  images: string[];
}

export const ImageGallery: React.FC<IProps> = ({ images }) => {
  return (
    <ImageList cols={4} className="journal-ImageList">
      {images.map((img) => (
        <ImageListItem key={img}>
          <img src={img} alt={"Imagen"} loading="lazy" /> 
        </ImageListItem> 
      ))}
    </ImageList>
  );
};



