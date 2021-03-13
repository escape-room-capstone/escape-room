import React from 'react';

export const Picture = (props) => {
  const [image] = useImage(props.src);
  return <Image image={image} />;
};
