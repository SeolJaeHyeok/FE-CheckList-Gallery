import React from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledTags = styled.div`
  display: none;
  overflow-x: auto;
  padding-top: 1rem;
  padding-bottom: 1rem;
  cursor: pointer;

  & :not(:first-child) {
    margin-left: 0.5rem;
  };

  @media (max-width: 1200px) {
    display: flex;
  };

  @media ${(props) => props.theme.devices.mobile} {
    justify-content: center;
  } ;
`;

const Tag = styled.span`
  flex-shrink: 0;
  height: 1.5rem;
  font-size: 0.75rem;
  border-radius: 0.75rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  background: ${(props) => props.theme.palette.daydream};
  color: ${(props) => props.theme.palette.triconblack};
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  line-height: 1.5;
  text-decoration: none;

  &.selected {
    background: ${(props) => props.theme.palette.lobelia};
    color: ${(props) => props.theme.palette.extrawhite};
  }
 `;

function Tags({ tags }: any) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const id = e.target.dataset.id.split('tags-')[1];
    if (id === 'all') {
      searchParams.delete('tag');
    } else {
      searchParams.set('tag', id);
    }
    setSearchParams(searchParams);
  };

  return (
    <StyledTags className="Tags" onClick={handleClick}>
      {tags.map(({
        _id, name, post, selected,
      }: any) => (
        <Tag key={_id} data-id={`tags-${_id}`} className={selected ? 'selected' : undefined}>
          {`${name}(${post})`}
        </Tag>
      ))}
    </StyledTags>
  );
}

export default Tags;
