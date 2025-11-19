import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import type { ListProps } from "../types/List";
import { formatDate } from "../utils/helpers";
import { BLOCK, LIMIT } from "../utils/constants";

const List = ({data, onPageChange}: ListProps) => {
  const {
    posts,
    currentPage,
    totalPages,
    totalItems
  } = data;

  const getPostNumber = (index: number) => {
    const startNumber = totalItems - (currentPage-1) * LIMIT;
    return startNumber - index;
  }

  const getPageNumbers = () => {
    const currentBlock = Math.ceil(currentPage / BLOCK);
    const startPage = (currentBlock - 1) * BLOCK + 1;
    const endPage = Math.min(startPage + BLOCK - 1, totalPages);

    const pages: number[] = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  const handlePageClick = (page: number) => {
    if(page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  }

  return (
    <div>
      <div className="min-h-120 md:min-h-135">
        <Table className="md:text-base">
          <TableHeader className="bg-[#f1f1ef]">
            <TableRow className="hover:bg-transparent">
              <TableHead>순서</TableHead>
              <TableHead>제목</TableHead>
              <TableHead>생성일</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {posts.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell className="w-15 text-center">{getPostNumber(index)}</TableCell>
                <TableCell className="max-w-50 md:max-w-130 overflow-hidden text-ellipsis whitespace-nowrap">{item.question}</TableCell>
                <TableCell className="w-30 text-center">{formatDate(item.created)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={() => handlePageClick(currentPage-1)} className={currentPage === 1 ? 'hidden' : ''} />
            </PaginationItem>
              
            {getPageNumbers().map((pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink href="#" isActive={pageNumber===currentPage} onClick={() => handlePageClick(pageNumber)} >{pageNumber}</PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext href="#" onClick={() => handlePageClick(currentPage+1)} className={currentPage === totalPages ? 'hidden' : ''} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

export default List;