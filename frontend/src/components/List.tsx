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

const List = ({data}: ListProps) => {
  return (
    <div>
      <Table className="text-base">
        <TableHeader className="bg-[#f1f1ef]">
          <TableRow className="hover:bg-transparent">
            <TableHead>순서</TableHead>
            <TableHead>제목</TableHead>
            <TableHead>생성일</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="text-center">{item.id}</TableCell>
              <TableCell>{item.question}</TableCell>
              <TableCell className="text-center">{item.created}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination className="mt-10">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination> 
    </div>
  )
}

export default List;