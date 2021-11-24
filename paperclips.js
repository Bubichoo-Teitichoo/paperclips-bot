

function bot_buy () 
{
	
	if (wireBasePrice > wireCost)
	{
		
		let requiredWire = wire / (10 + (clipmakerLevel * clipperBoost) + (megaClipperLevel * megaClipperBoost));
		while (funds > wireCost && 120 > requiredWire)
		{
			buyWire();
		}
	} 
	if (funds > (clipperCost + wireBasePrice))
	{
		makeClipper();
	}
	if (funds > (megaClipperCost + wireBasePrice))
	{
		makeMegaClipper();
	}
	if (funds > adCost)
	{
		buyAds();
	}
}

function bot_update_price()
{
	let supply = clipmakerLevel * clipperBoost + megaClipperLevel * megaClipperBoost;
	if (100 > supply)
	{
		if (0 !== wire)
		{
	  		clipClick(wire);
		}
		supply += 30;
	}

	if (0.02 < margin && supply > avgSales)
	{
		lowerPrice();
	}
	else if (supply < avgSales)
	{
		raisePrice();
	}
}

function bot_upgrade()
{
	let i = 0;
	for (i = 0; i < projectListTopElement.children.length; i++)
	{
		if (!projectListTopElement.children[i].disabled 
			&& -1 !== projectListTopElement.children[i].innerText.search("Photonic"))
		{
			projectListTopElement.children[i].click();
			i = projectListTopElement.children.length;
	      	break;
		}
	}
	for (i = 0; i < projectListTopElement.children.length; i++)
	{
		if (!projectListTopElement.children[i].disabled)
	    {
	      projectListTopElement.children[i].click();
	      break;
	    }
	}

	if (!btnAddMemElement.disabled && !btnAddProcElement.disabled)
	{
		if (10 > memory)
		{
			if (7 > processors)
			{
				addProc();
			}
		 	else
		    {
		      addMem();
		    }
		}
		else
		{
		  addProc();  
		}
	}

	while(yomi > investUpgradeCost)
	{
		investUpgrade();
	}
}

function bot_click_qcom()
{
	let sum = 0.0;
	for (i = 0; i < qChips.length; i++)
	{
		if (qChips[i].active)
		{
			sum += qChips[i].value; 
		}
	}

	if (0.0 < sum )
	{
	  	for(let i = 0; i < 10000; i++){
	      qComp();
	    }
	}
}

function bot_invest() {
	if (25 <= investLevel)
	{
		investStratElement.value = "hi"
		if (bankroll > avgRev * 1000)
		{
			investWithdraw()
		}
		else if (portTotal == 0)
		{
			investDeposit();
		}
		
	}
}

function bot_farm_yomi()
{
	if ("none" != strategyEngineElement.style.display && (1000 * memory < operations ) )
	{
		stratPickerElement.value = stratPickerElement.options[stratPickerElement.options.length - 1].value;
		let numTourneys = Math.floor((operations - 1000 * memory) / tourneyCost);
		for (let i = 0; i < numTourneys; i++)
		{
			newTourney();
		  	runTourney();    
		}
	}
}

let bot_cycle = 0;
function bot_main()
{

  	bot_update_price();
  	bot_buy();
  	bot_click_qcom();
  	if (0 === bot_cycle)
  	{
  		bot_farm_yomi();
  		bot_cycle = 1;
  	}
  	else if (1 === bot_cycle)
  	{
  		bot_invest();
  		bot_cycle = 2;
  	}
  	else
  	{
		bot_upgrade();
		bot_cycle = 0;
  	}
}

setInterval(bot_main, 1000);
