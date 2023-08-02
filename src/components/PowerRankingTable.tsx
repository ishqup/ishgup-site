import * as React from 'react'
import chroma from "chroma-js";
import 'remixicon/fonts/remixicon.css'

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  createColumnHelper,
  CellContext,
  RowData,
} from '@tanstack/react-table'

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends RowData, TValue> {
    style: (context: CellContext<any, unknown>) => object,
    class: string
  }
}

type Ranking = {
  Team: string
  W: number
  L: number
  Rating: number
  Rank: number
  PF: number
  PA: number
}



const ReactTable = (props: { data: Ranking[]; }) => {
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      "id": "Rank",
      "desc": false
    }
  ])

  const json = props.data;

  const RatingValues = json.map(x => x.Rating)
  const PFValues = json.map(x => x.PF)
  const PAValues = json.map(x => x.PA)

  const colorScale = ["#ff52a0", "#1b2a3d", "#00dc9a"]
  const revColorScale = ["#00dc9a", "#1b2a3d", "#ff52a0"]


  const ratingScale = chroma.scale(colorScale).domain([Math.min(...RatingValues), Math.max(...RatingValues)]);
  const pfScale = chroma.scale(colorScale).domain([Math.min(...PFValues), Math.max(...PFValues)]);
  const paScale = chroma.scale(revColorScale).domain([Math.min(...PAValues), Math.max(...PAValues)]);

  const columnHelper = createColumnHelper<Ranking>()

  const numberClass = "font-IBM text-right w-[100px] pr-[10px]"

  const columns = [
    columnHelper.accessor('Team', {
      cell: info => info.getValue(),
      enableSorting: false,
      meta: {
        style: (context: CellContext<Ranking, unknown>) => {
          return { style: {} }
        },
        class: "font-Grotesk"
      }
    }),
    columnHelper.accessor('Rank', {
      cell: info => info.getValue(),
      meta: {
        style: (context: CellContext<Ranking, unknown>) => {
          return { style: {} }
        },
        class: "font-IBM"
      }
    }),
    columnHelper.accessor('W', {
      cell: info => info.getValue(),
      meta: {
        style: (context: CellContext<Ranking, unknown>) => {
          return { style: {} }
        },
        class: "font-IBM"
      }
    }),
    columnHelper.accessor('L', {
      cell: info => info.getValue(),
      meta: {
        style: (context: CellContext<Ranking, unknown>) => {
          return { style: {} }
        },
        class: "font-IBM"
      }
    }),
    columnHelper.accessor('Rating', {
      cell: info => info.getValue().toFixed(2),
      meta: {
        style: (context: CellContext<Ranking, unknown>) => {
          return {
            style: {
              backgroundColor: ratingScale(context.cell.getValue<number>()).hex()
            }
          }
        },
        class: numberClass
      }
    }),
    columnHelper.accessor('PF', {
      cell: info => info.getValue().toFixed(2),
      meta: {
        style: (context: CellContext<Ranking, unknown>) => {
          return {
            style: {
              backgroundColor: pfScale(context.cell.getValue<number>()).hex()
            }
          }
        },
        class: numberClass
      }
    }),
    columnHelper.accessor('PA', {
      cell: info => info.getValue().toFixed(2),
      meta: {
        style: (context: CellContext<Ranking, unknown>) => {
          return {
            style: {
              backgroundColor: paScale(context.cell.getValue<number>()).hex()
            }
          }
        },
        class: numberClass
      }
    }),
  ]



  const table = useReactTable({
    data: json,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className='max-w-none bg-slate-800 rounded-xl overflow-auto'>
      <table className='text-lg w-full my-0'>
        <thead className='font-Grotesk whitespace-nowrap'>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan} className="text-left p-2 first:pl-4 last:pr-4">
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none hover:text-teal-400 transition-all ' +
                            (header.column.getIsSorted() != false ? "text-teal-400" : "")
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {" "}
                        {header.column.getCanSort() ? ({
                          asc: <i className="ri-arrow-up-s-fill"></i>,
                          desc: <i className="ri-arrow-down-s-fill"></i>,
                        }[header.column.getIsSorted() as string] ?? <i className="ri-arrow-up-down-line"></i>) : null}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table
            .getRowModel().rows
            .map(row => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td key={cell.id} className={'border-b-[1px] border-y-slate-700 border-opacity-20 p-2 first:pl-4 last:pr-4 ' + cell.column.columnDef.meta?.class}
                        {...cell.column.columnDef.meta?.style(cell.getContext())}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default ReactTable;