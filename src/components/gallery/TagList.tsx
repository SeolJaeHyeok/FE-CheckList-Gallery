import React from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledTagList = styled.div`
    position: absolute;
    width: 11.5rem;
    left: -13.5rem;
    margin-top: 2rem;

    & .title {
        font-size: 1rem;
        line-height: 1.5;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid ${(props) => props.theme.palette.triconblack};
        margin-bottom: 1rem;
        color: ${(props) => props.theme.palette.triconblack};
        font-weight: bold;
    };

    & ul :not(:first-child) {
      margin-top: 0.25rem;
    };

    @media (max-width: 1200px) {
      display: none;
    };
`;

const Tag = styled.li`
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${(props) => props.theme.palette.triconblack};
  font-weight: bold;
  cursor: pointer;

  &.selected span {
    color: ${(props) => props.theme.palette.lobelia};
    font-weight: bold;
  }
`;

const StyledSpan = styled.span`
  margin-left: 0.5rem;
  color: ${(props) => props.theme.palette.daydream};
  font-weight: normal;

  :hover {
    text-decoration: underline;
  };
`;

function TagList({ tags }: any) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (e: any) => {
    e.preventDefault();

    const target = e.target.closest('li');
    const id = target.dataset.id.split('taglist-')[1];
    if (id === 'all') {
      searchParams.delete('tag');
    } else if (id) {
      searchParams.set('tag', id);
    }
    setSearchParams(searchParams);
  };

  return (
    <StyledTagList className="TagList" onClick={handleClick}>
      <div>
        <div className="title">태그 목록</div>
        <ul>
          {tags.map(({
            _id, name, post, selected,
          }: any) => (
            <Tag key={_id} data-id={`taglist-${_id}`} className={selected ? 'selected' : undefined}>
              <StyledSpan>{`${name}(${post})`}</StyledSpan>
            </Tag>
          ))}
        </ul>
      </div>
    </StyledTagList>
  );
}

export default TagList;
