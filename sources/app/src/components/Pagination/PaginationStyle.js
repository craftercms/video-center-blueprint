import { Pagination } from 'antd';
import styled from 'styled-components';
import { palette } from 'styled-theme';

const PaginationHolder = styled(Pagination)`
  text-align: center;
  .ant-pagination-item {
    border-color: ${palette('primary', 1)};
    background-color: ${palette('primary', 1)};
    &:hover {
      border-color: ${palette('primary', 3)};
      a {
        color: ${palette('primary', 3)};
      }
    }
    a {
      border-radius: 4px;
    }
  }
  li {
    &.ant-pagination-item-active {
      a {
        color: ${palette('primary', 3)};
      }
    }
    a {
      &.ant-pagination-item-link {
        border-color: ${palette('primary', 1)};
        background-color: ${palette('primary', 1)};
        color: ${palette('primary', 4)};
      }
      background-color: ${palette('primary', 1)};
      color: ${palette('primary', 4)};
    }
    &.ant-pagination-item-active {
      border-color: ${palette('primary', 3)};
    }
    &.ant-pagination-disabled {
      a {
        background-color: rgba(255, 255, 255, 0.12);
        color: rgba(255, 255, 255, 0.3);
      }
    }
  }
  .ant-select-selection {
    color: ${palette('primary', 4)};
    background-color: ${palette('primary', 1)};
    border: 1px solid ${palette('primary', 1)};
    &:hover, &:active, &:focus {
      border-color: ${palette('primary', 3)};
    }
  }
  .ant-select-arrow {
    color: ${palette('primary', 4)};
  }
  .ant-pagination-prev:hover, .ant-pagination-next:hover {
    &.ant-pagination-disabled {
      a {
        background-color: rgba(255, 255, 255, 0.12);
        color: rgba(255, 255, 255, 0.3);
        border-color: ${palette('primary', 1)};
      }
    }
    a {
      border-color: ${palette('primary', 3)};
      color: ${palette('primary', 3)};
    }
  }
  .ant-select-dropdown {
    background-color: ${palette('primary', 1)};
    li {
      color: ${palette('primary', 4)};
    }
    .ant-select-dropdown-menu-item {
      &:hover {
        background-color: ${palette('primary', 2)};
        color: ${palette('primary', 4)};
      }
      &.ant-select-dropdown-menu-item-selected {
        background-color: ${palette('primary', 2)};
        color: ${palette('primary', 4)};
      }
    }
  }
  .ant-pagination-item-ellipsis {
    color: ${palette('primary', 4)} !important;
  }
  .anticon {
    &.anticon-double-left, &.anticon-double-right {
      color: ${palette('primary', 3)} !important;
    }
  }
`;

export default PaginationHolder;