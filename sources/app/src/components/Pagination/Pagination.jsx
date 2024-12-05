import React from 'react';
import PaginationHolder from './PaginationStyle';

export const PAGINATION_DEFAULT_PAGE_SIZE = 12;

const defaultOptions = [
  PAGINATION_DEFAULT_PAGE_SIZE * 1,
  PAGINATION_DEFAULT_PAGE_SIZE * 2,
  PAGINATION_DEFAULT_PAGE_SIZE * 3,
  PAGINATION_DEFAULT_PAGE_SIZE * 4,
];

const DEFAULT_ACTIVE_PAGE = 1;

export function Pagination(props) {
  const {
    total,
    defaultCurrent,
    pageSizeOptions,
    onChange,
    onShowSizeChange
  } = props;

  return (
    <PaginationHolder
      showSizeChanger
      onChange={onChange}
      onShowSizeChange={onShowSizeChange}
      defaultCurrent={defaultCurrent || DEFAULT_ACTIVE_PAGE}
      defaultPageSize={PAGINATION_DEFAULT_PAGE_SIZE}
      pageSizeOptions={pageSizeOptions || defaultOptions.map(option => option.toString())}
      total={total}
    />
  );
};