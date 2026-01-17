import React from "react";
import DataTable from "@/components/DataTable";

export const CoinOverviewFallback = () => {
  return (
    <div id="coin-overview-fallback" className="p-2">
      <div className="header pt-2">
        <div className="header-image bg-dark-400 animate-pulse" />
        <div className="info">
          <div className="header-line-sm bg-dark-400 animate-pulse rounded" />
          <div className="header-line-lg bg-dark-400 animate-pulse rounded" />
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="period-button-skeleton bg-dark-400 animate-pulse" />
        ))}
      </div>
      <div className="chart mt-4">
        <div className="chart-skeleton bg-dark-400 animate-pulse" />
      </div>
    </div>
  );
};

export const TrendingCoinsFallback = () => {
  const columns = [
    { header: "Name", cell: () => (
      <div className="name-cell">
        <div className="name-link">
          <div className="name-image bg-dark-400 animate-pulse" />
          <div className="name-line bg-dark-400 animate-pulse rounded" />
        </div>
      </div>
    ) },
    { header: "24h Change", cell: () => (
      <div className="change-cell">
        <div className="price-change">
          <div className="change-icon bg-dark-400 animate-pulse" />
          <div className="change-line bg-dark-400 animate-pulse rounded" />
        </div>
      </div>
    ) },
    { header: "Price", cell: () => (
      <div className="price-cell">
        <div className="price-line bg-dark-400 animate-pulse rounded" />
      </div>
    ) },
  ];

  const data = Array.from({ length: 6 }).map((_, i) => i);

  return (
    <div id="trending-coins-fallback">
      <h4>Trending Coins</h4>
      <div className="trending-coins-table">
        <DataTable
          data={data as unknown as []}
          columns={columns as unknown as []}
          rowKey={(row: number) => row}
          headerCellClassName="py-3!"
          bodyCellClassName="py-2!"
        />
      </div>
    </div>
  );
};

export default function FallbackBundle() {
  return null;
}
