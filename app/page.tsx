import DataTable from '@/components/DataTable'
import { fetcher } from '@/lib/coingecko.action';
import { cn } from '@/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';

const columns: DataTableColumn<TrendingCoin>[] = [
  {
    header: "Name",
    cellClassName: 'name-cell',
    cell: (coin) => {
      const item = coin.item;
      return (
        <Link href={`/coins/${item.id}`}>
          <Image
            src={item.large} alt={item.name} width={36} height={36}
          />
          <p>{item.name}</p>
        </Link>
      );
    },
  },

  {
    header: '24h Change',
    cellClassName: 'name-cell',
    cell: (coin) => {
      const item = coin.item;
      const pct = item.data.price_change_percentage_24h.usd ?? 0;
      const isTrendingUp = pct > 0;
      const price = item.data.price ?? 0;
      const absChange = +(price * (pct / 100));
      const pctStr = `${pct > 0 ? '+' : ''}${pct.toFixed(2)}%`;
      const usdStr = `${absChange > 0 ? '+' : ''}${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(absChange)}`;

      return (
        <div className={cn('flex items-center gap-2', isTrendingUp ? 'text-green-500' : 'text-red-500')}>
          <span>
            {isTrendingUp ? (
              <TrendingUp width={16} height={16} />
            ) : (
              <TrendingDown width={16} height={16} />
            )}
          </span>
          <div className='flex flex-col'>
            <span className='text-sm font-medium'>{pctStr}</span>
            <span className='text-xs opacity-80'>{usdStr}</span>
          </div>
        </div>
      )
    }
  },
  {
    header:'Price',cellClassName:'price-cell',
    cell:(coin)=> {
      const price = coin.item.data.price ?? 0;
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
    }
  },
]

const dummyTrending: TrendingCoin[] = [
  {
    item: {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      market_cap_rank: 1,
      thumb: 'https://assets.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400',
      large: 'https://assets.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400',
      data: {
        price: 89113,
        price_change_percentage_24h: { usd: 1.23 },
      },
    },
  },
  {
    item: {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      market_cap_rank: 2,
      thumb: 'https://assets.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400',
      large: 'https://assets.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400',
      data: {
        price: 3400,
        price_change_percentage_24h: { usd: -0.87 },
      },
    },
  },
  {
    item: {
      id: 'example-coin',
      name: 'Example Coin',
      symbol: 'EX',
      market_cap_rank: 999,
      thumb: 'https://assets.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400',
      large: 'https://assets.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400',
      data: {
        price: 0.12,
        price_change_percentage_24h: { usd: 5.5 },
      },
    },
  },
]

const page = async () => {
  const coin = await fetcher<CoinDetailsData>('coins/bitcoin', {
    localization: false,
    tickers: false,
    market_data: true,
    community_data: false,
    developer_data: false,
    sparkline: false,
  }, 60); 

  
  return (
    <main className='main-container '>
      <section className='home-grid '>
        <div id='coin-overview'>
          <div className='header pt-2'>
            <Image
            src={coin.image.large}
              alt='Bitcoinlogo'
              width={56}
              height={56}
            />
            <div className='info'>
              <p>{coin.name} / {coin.symbol === 'btc'?'BTC':'BTC'}</p>
              <h1>{coin.market_data?.current_price?.inr?.toFixed(2)} INR</h1>
            </div>
          </div>
        </div>
        <p>Trending Coins</p>
        <DataTable
          data={dummyTrending}
          columns={columns}
          rowKey={(row) => row.item.id}
        />
      </section>
      <section className='w-full mt-7 space-y-7'>
        <p>Categories</p>
      </section>
    </main>
  )
}

export default page