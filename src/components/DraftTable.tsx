import * as React from 'react'
import chroma from "chroma-js";
import 'remixicon/fonts/remixicon.css'
import axios from 'axios';

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
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

export interface ESPNPlayer {
  draftAuctionValue: number;
  id: number;
  keeperValue: number;
  keeperValueFuture: number;
  lineupLocked: boolean;
  onTeamId: number;
  player: Player;
  ratings: Ratings;
  rosterLocked: boolean;
  status: string;
  tradeLocked: boolean;
  waiverProcessDate: number;
}

export interface Player {
  active: boolean;
  defaultPositionId: number;
  draftRanksByRankType: DraftRanksByRankType;
  droppable: boolean;
  eligibleSlots: number[];
  firstName: string;
  fullName: string;
  id: number;
  injured: boolean;
  injuryStatus: string;
  jersey: string;
  lastName: string;
  lastNewsDate: number;
  lastVideoDate: number;
  ownership: Ownership;
  proTeamId: number;
  rankings: Rankings;
  seasonOutlook: string;
  stats: Stat[];
}

export interface DraftRanksByRankType {
  STANDARD: Ppr;
  PPR: Ppr;
}

export interface Ppr {
  auctionValue: number;
  published: boolean;
  rank: number;
  rankSourceId: number;
  rankType: RankType;
  slotId: number;
  averageRank?: number;
}

export enum RankType {
  Ppr = "PPR",
  Standard = "STANDARD",
}

export interface Ownership {
  activityLevel: null;
  auctionValueAverage: number;
  auctionValueAverageChange: number;
  averageDraftPosition: number;
  averageDraftPositionPercentChange: number;
  date: number;
  leagueType: number;
  percentChange: number;
  percentOwned: number;
  percentStarted: number;
}

export interface Rankings {
  "0": Ppr[];
}

export interface Stat {
  appliedTotal: number;
  externalId: string;
  id: string;
  proTeamId: number;
  scoringPeriodId: number;
  seasonId: number;
  statSourceId: number;
  statSplitTypeId: number;
  stats: { [key: string]: number };
  appliedAverage?: number;
}

export interface Ratings {
  "0": The0;
}

export interface The0 {
  positionalRanking: number;
  totalRanking: number;
  totalRating: number;
}



const ESPN_URL = "https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/2024/segments/0/leaguedefaults/3?view=kona_player_info";
const ESPN_FILTER = { "players": { "filterSlotIds": { "value": [0, 23] }, "sortAdp": { "sortPriority": 1, "sortAsc": true }, "sortDraftRanks": { "sortPriority": 100, "sortAsc": true, "value": "PPR" }, "filterRanksForSlotIds": { "value": [0, 2, 4, 6, 17, 16] }, "filterStatsForTopScoringPeriodIds": { "value": 2, "additionalValue": ["002023", "102023", "002022", "022023"] } } }

type IshanPlayer = {
  index: number,
  Player: string,
  Pos: string,
  p2024: number,
  eADP: number
}


type PlayerRow = {
  Name: string,
  Pos: string,
  EspnADP: number,
  EspnRank: number,
  EspnProj: number,
  IshanRank: number,
  IshanProj: number,
  Difference: number
}



const DraftTable = (props: { ishanData: IshanPlayer[] }) => {
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      "id": "EspnRank",
      "desc": false
    }
  ])
  const [masterTableData, setMasterData] = React.useState<PlayerRow[]>([]);
  const [currentTableData, setCurrentTableData] = React.useState<PlayerRow[]>([]);
  const [isLoading, setLoading] = React.useState(true);
  const [positionFilter, setPositionFilter] = React.useState([true, true, true, true]); // qb, rb, wr, te

  const numberClass = "font-SourceCodePro text-right w-[100px] pr-[10px]"
  const columnHelper = createColumnHelper<PlayerRow>()

  const espnPosIdToString: { [key: number]: string } = {
    1: "QB",
    2: "RB",
    3: "WR",
    4: "TE"
  }

  const updateFilter = (index: number) => {
    let tmp = positionFilter
    tmp[index] = !positionFilter[index]
    setPositionFilter(tmp)

    const positions = positionFilter.map((v, i) => {
      if (v) {
        return espnPosIdToString[i + 1]
      }
    }).filter(x => x != undefined)

    console.log(positions)

    setCurrentTableData(masterTableData.filter(x => positions.includes(x.Pos)))

    console.log(currentTableData)
  }

  React.useEffect(() => {
    axios.get(ESPN_URL, {
      headers: {
        "X-Fantasy-Filter": JSON.stringify(ESPN_FILTER),
      }
    }).then((res) => {
      const espnPlayers: ESPNPlayer[] = res.data["players"];
      let playerRatings: PlayerRow[] = espnPlayers.map((x, i) => {
        return {
          Name: x.player && x.player.fullName ? x.player.fullName : "",
          Pos: x.player && x.player.defaultPositionId ? espnPosIdToString[x.player.defaultPositionId] : "N/A",
          EspnRank: i + 1,
          EspnADP: x.player.ownership && x.player.ownership.averageDraftPosition ? Number.parseFloat(x.player.ownership.averageDraftPosition.toFixed(1)) : 0,
          EspnProj: x.player.stats?.find(x => x.externalId == "2024" && x.statSourceId == 1)?.appliedTotal ?? 0,
          IshanRank: 0,
          IshanProj: 0,
          Difference: 0,
        }
      })

      console.log(props.ishanData)

      playerRatings.forEach(x => {
        let ishanPlayer = props.ishanData.find(y => y.Player.trim() == x.Name);
        if (ishanPlayer) {
          x.IshanRank = ishanPlayer.eADP;
          x.IshanProj = ishanPlayer.p2024;
        }
      })
      playerRatings.forEach(x => x.Difference = x.EspnRank - x.IshanRank)

      setMasterData(playerRatings)
      setCurrentTableData(playerRatings)


      setLoading(false);
    })
  }, []);

  const fullNameToShort = (name: string) => {
    const split = name.split(" ")
    const firstChar = split[0].charAt(0)
    const lastName = split.splice(1).join()

    return firstChar + "." + lastName
  }


  const columns = [
    columnHelper.accessor('Name', {
      cell: info => fullNameToShort(info.getValue()),
      enableSorting: false,
      size: 100,
      meta: {
        style: (context: CellContext<PlayerRow, unknown>) => {
          return {
            style: {
            }
          }
        },
        class: "font-Grotesk"
      }
    }),
    columnHelper.accessor('Pos', {
      header: "Pos",
      cell: info => info.getValue(),
      enableSorting: false,
      meta: {
        style: (context: CellContext<PlayerRow, unknown>) => {
          return { style: {} }
        },
        class: "font-Grotesk"
      }
    }),
    columnHelper.accessor('EspnADP', {
      header: "ADP",
      cell: info => info.getValue(),
      meta: {
        style: (context: CellContext<PlayerRow, unknown>) => {
          return { style: {} }
        },
        class: "font-SourceCodePro"
      }
    }),
    columnHelper.accessor('EspnRank', {
      header: "ESPN Rk",
      cell: info => info.getValue(),
      meta: {
        style: (context: CellContext<PlayerRow, unknown>) => {
          return { style: {} }
        },
        class: "font-SourceCodePro"
      }
    }),
    columnHelper.accessor('EspnProj', {
      header: "ESPN Proj",
      cell: info => info.getValue().toFixed(2),
      meta: {
        style: (context: CellContext<PlayerRow, unknown>) => {
          return { style: {} }
        },
        class: "font-SourceCodePro"
      }
    }),
    columnHelper.accessor('IshanRank', {
      header: "Ishan Rk",
      cell: info => info.getValue() == 0 ? "N/A" : info.getValue(),
      meta: {
        style: (context: CellContext<PlayerRow, unknown>) => {
          return { style: {} }
        },
        class: "font-SourceCodePro"
      }
    }),
    columnHelper.accessor('IshanProj', {
      header: "Ishan Proj",
      cell: info => info.getValue() == 0 ? "N/A" : info.getValue().toFixed(2),
      meta: {
        style: (context: CellContext<PlayerRow, unknown>) => {
          return { style: {} }
        },
        class: "font-SourceCodePro"
      }
    }),
    columnHelper.accessor("Difference", {
      header: "Diff",
      cell: info => {
        const ishanProjTotal = info.row.getValue("IshanProj");
        if (ishanProjTotal == 0) {
          return "N/A";
        }
        return info.getValue();
      },
      meta: {
        style: (context: CellContext<PlayerRow, unknown>) => {
          const ishanProjTotal = context.row.getValue('IshanProj');
          if (ishanProjTotal == 0) {
            return {
              style: {
                backgroundColor: differenceScale(0).hex()
              }
            };
          }
          return {
            style: {
              backgroundColor: differenceScale(context.cell.getValue<number>()).hex()
            }
          };
        },
        class: numberClass
      }
    }),
  ]

  const differenceValues = masterTableData.map(x => x.Difference)

  const colorScale = ["#ff52a0", "#1b2a3d", "#00dc9a"]
  const differenceScale = (chroma.scale(colorScale).domain([-25, 0, 25]))



  const table = useReactTable({
    data: currentTableData,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
    },
  })

  if (isLoading) {
    return (<></>);
  }

  const posToTWClass: { [key: string]: string } = {
    "RB": "bg-[#336149]",
    "WR": "bg-[#335261]",
    "TE": "bg-[#615933]",
    "QB": "bg-[#613349]"
  }


  return (
    <div>
      {/* <input type="checkbox" defaultChecked={true} onChange={() => updateFilter(0)} />
      <input type="checkbox" defaultChecked={true} onChange={() => updateFilter(1)} />
      <input type="checkbox" defaultChecked={true} onChange={() => updateFilter(2)} />
      <input type="checkbox" defaultChecked={true} onChange={() => updateFilter(3)} /> */}
      <div className='max-w-none bg-slate-800 rounded-xl overflow-auto'>
        <table className='text-lg w-full'>
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
          <tbody className='text-white rounded-sm'>
            {table
              .getRowModel().rows
              .map(row => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => {
                      return (
                        <td
                          key={cell.id}
                          className=
                          {
                            'border-b-[1px] border-y-slate-700 border-opacity-20 p-2 first:pl-4 last:pr-4 '
                            + cell.column.columnDef.meta?.class + ' '
                            + posToTWClass[row.getValue("Pos") as string]
                          }
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
        <div className="flex items-center gap-2 p-2 font-Verdana">
          <button
            className="border rounded p-1 px-3 cursor-pointer select-none hover:text-teal-400 hover:border-teal-400 transition-all"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <i className="ri-arrow-left-line font-bold"></i>
          </button>
          <button
            className="border rounded p-1 px-3 cursor-pointer select-none hover:text-teal-400 hover:border-teal-400 transition-all"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <i className="ri-arrow-right-line font-bold"></i>
          </button>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </strong>
          </span>
        </div>
      </div>
    </div>
  )
}

export default DraftTable;