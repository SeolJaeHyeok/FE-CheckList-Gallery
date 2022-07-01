import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ICategoryListProps } from '@interfaces/interface';
import noImage from '@images/noImage.jpeg';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SliderItemContainer = styled.div`
  width: 50rem;
  height: 33rem;
  margin: 0 0;
  border-radius: 5%;
  background-color: ${(props) => props.theme.palette.extrawhite};

  @media screen and ${(props) => props.theme.devices.mobile} {
    width: 30rem;
    height: 28rem;
  }
`;

const ItemHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.3rem;
`;

const SliderItemCreated = styled.span`
  font-size: 1.3rem;
  margin-left: 1rem;
`;

const SliderItemAuthor = styled.span`
  font-size: 1.3rem;
  margin-right: 1rem;
`;

const SliderItemImage = styled.img`
  cursor: pointer;
  box-sizing: border-box;
  width: 30rem;
  height: 20rem;
  padding: 2rem;
  margin: 1rem auto;
  object-fit: contain;
  @media screen and ${(props) => props.theme.devices.mobile} {
    width: 20rem;
    height: 15rem;
  }
`;

const SliderItemTitle = styled.div`
  font-size: 2rem;
  text-align: center;
`;

const SliderItemDescription = styled.div`
  font-size: 1.2rem;
  text-align: center;
  width: 45rem;
  margin: 1rem 1.5rem;
  text-overflow: ellipsis;
  overflow:hidden;
  white-space:nowrap;
  @media screen and ${(props) => props.theme.devices.mobile} {
    width: 27rem;
  }
`;

const SliderItemTagContainer = styled.div`
  text-align: end;
  margin-top: 1rem;
  & :last-child {
    margin-right: 1rem;
  }
  @media screen and ${(props) => props.theme.devices.mobile} {
    text-align: center;
    margin-top: 2rem;
  }
`;

const SliderItemTag = styled(Link)`
  background-color: ${(props) => props.theme.palette.triconblack};
  margin-left: 0.5rem;
  padding: 0.5rem;
  color: white;
  border-radius: 10%;
  text-decoration: none;
`;

function SliderItem({ post }: any) {
  const handleNavigate = () => {
    location.href = `/FE-CheckList-Gallery/gallery/${post._id}`;
  };

  // Thumbnail 허용 확장자 필터링
  const allowedFile = ['jpg', 'jpeg', 'png'];
  const thumbnailUrl = post.thumbnail.fileUrl.split('.');
  const filename = thumbnailUrl[thumbnailUrl.length - 1];

  const imageUrl = allowedFile.includes(filename) ? post.thumbnail.fileUrl : noImage;

  return (
    <Container>
      <SliderItemContainer>
        <ItemHeaderContainer>
          {post.createdAt && <SliderItemCreated>{post.createdAt.slice(0, 10)}</SliderItemCreated>}
          {post.author && (
            <SliderItemAuthor>
              Made By
              {' '}
              {post.author.username}
            </SliderItemAuthor>
          )}
        </ItemHeaderContainer>
        <SliderItemImage
          onClick={handleNavigate}
          src={imageUrl}
        />
        <SliderItemTitle>{post.title}</SliderItemTitle>
        <SliderItemDescription>
          {post.description}
        </SliderItemDescription>
        <SliderItemTagContainer>
          {post.categories.map(({ category }: ICategoryListProps) => (
            <SliderItemTag to={`/gallery?tag=${category._id}`}>{category.name}</SliderItemTag>
          ))}
        </SliderItemTagContainer>
      </SliderItemContainer>
    </Container>
  );
}

export default SliderItem;
