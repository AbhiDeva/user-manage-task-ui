export const generateBestTimeToBuyStockSteps = (prices) => {
    const steps = [];
    let minPrice = Infinity;
    let maxProfit = 0;
    let buyDay = -1, sellDay = -1;
    let bestBuy = -1, bestSell = -1;

    steps.push({
      description: `Find best time to buy and sell stock: prices = [${prices.join(', ')}]`,
      data: { prices, minPrice, maxProfit, current: -1, buyDay, sellDay, bestBuy, bestSell }
    });

    for (let i = 0; i < prices.length; i++) {
      steps.push({
        description: `Day ${i}: price = ${prices[i]}`,
        data: { prices, minPrice, maxProfit, current: i, buyDay, sellDay, bestBuy, bestSell, checking: true }
      });

      if (prices[i] < minPrice) {
        minPrice = prices[i];
        buyDay = i;
        
        steps.push({
          description: `New minimum price: ${minPrice} at day ${i}`,
          data: { prices, minPrice, maxProfit, current: i, buyDay, sellDay, bestBuy, bestSell, newMin: true }
        });
      } else {
        const profit = prices[i] - minPrice;
        
        steps.push({
          description: `Potential profit: ${prices[i]} - ${minPrice} = ${profit}`,
          data: { prices, minPrice, maxProfit, current: i, buyDay, sellDay: i, bestBuy, bestSell, profit }
        });

        if (profit > maxProfit) {
          maxProfit = profit;
          bestBuy = buyDay;
          bestSell = i;
          
          steps.push({
            description: `New maximum profit: ${maxProfit} (buy day ${bestBuy}, sell day ${bestSell})`,
            data: { prices, minPrice, maxProfit, current: i, buyDay, sellDay: i, bestBuy, bestSell, newMax: true }
          });
        }
      }
    }

    steps.push({
      description: `Maximum profit: ${maxProfit} (buy at ${prices[bestBuy]} on day ${bestBuy}, sell at ${prices[bestSell]} on day ${bestSell})`,
      data: { prices, minPrice, maxProfit, current: -1, buyDay, sellDay, bestBuy, bestSell, complete: true }
    });

    return steps;
  };