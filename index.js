import {ethers} from "./ethers-5.6.esm.min.js";

const connectBtn=document.getElementById("connectButton");
connectBtn.onclick= async function()
{
  await connect();
}

const referrerAddress=document.getElementById("add1");
const submit1=document.getElementById("s1");
const choice=document.getElementById("currentChoice");
const button1=document.getElementById("b1");
const button2=document.getElementById("b2");
const button3=document.getElementById("b3");
const companyAddress=document.getElementById("add2");
const submit2=document.getElementById("s2");
const rootAddress=document.getElementById("add3");
const submit3=document.getElementById("s3");

let refAddress;
let transactionValue;
let idxOfTheClicked=-1
let company;
let root;
const contractAddress="0x5fbdb2315678afecb367f032d93f642f64180aa3";
const abi= [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_parent",
        "type": "address"
      }
    ],
    "name": "Buy",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_superConnector",
        "type": "address"
      }
    ],
    "name": "addRoot",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "company",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCompany",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "getRewardsInGwei",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getUsersLength",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "map",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "rewards",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_company",
        "type": "address"
      }
    ],
    "name": "setCompanyAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "users",
    "outputs": [
      {
        "internalType": "address",
        "name": "parent",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

button1.onclick=function()
{
  idxOfTheClicked=1;
  change();
  console.log(idxOfTheClicked);
}
button2.onclick=function()
{
  idxOfTheClicked=2;
  change();
  console.log(idxOfTheClicked);
}
button3.onclick=function()
{
  idxOfTheClicked=3;
  change();
  console.log(idxOfTheClicked);
}

submit1.onclick= async function()
{
    buyService();
}

submit2.onclick= async function()
{
    setCompany();
}

submit3.onclick= async function()
{
    setRoot();
}





async function connect()
{
  if (typeof window.ethereum !== "undefined")
  {
    try
    {
      const accounts=await window.ethereum.request({method: "eth_requestAccounts"});

      if (accounts.length > 0)
      {
        const selectedAddress = accounts[0];
        console.log(`Connected to Ethereum with address: ${selectedAddress}`);
        // You can now proceed with other actions that require the user to be connected
        connectBtn.innerHTML="CONNECTED!";
      } 
      else
      {
        console.log("User denied account access.");
        // Handle the case where the user denied account access
      }
    }
    catch(error)
    {
      console.log(error);
    }
  }
}

function change()
{
  if(idxOfTheClicked==1)
  {
    transactionValue=0.1;
    choice.innerHTML="- Service(A) - | 0.1 ETH";
  }
  else if(idxOfTheClicked==2)
  {
    transactionValue=0.15;
    choice.innerHTML="- Service(B) - | 0.15 ETH";
  }
  else
  {
    transactionValue=0.2;
    choice.innerHTML="- Service(C) - | 0.2 ETH";
  }
}

async function setCompany()
{
  const toSet=companyAddress.value;
  console.log(toSet);
  if (!toSet || !ethers.utils.isAddress(toSet))
  {
    alert("Please enter a valid Ethereum address");
    return;
  }

  const providerr = new ethers.providers.Web3Provider(window.ethereum);
  const signerr = providerr.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signerr);
  console.log(typeof(toSet));


  try
  {
    // Call the setCompanyAddress function on the smart contract
    const transaction = await contract.setCompanyAddress(toSet);
    await transaction.wait();
    console.log("Company address set successfully!");
  }
  catch (error)
  {
    console.error("Error setting company address:", error.message || error.toString());
    alert("Error setting company address. Check the console for details.");
  }
}

async function setRoot()
{
  const toSet=rootAddress.value;
  if (!toSet || !ethers.utils.isAddress(toSet))
  {
    alert("Please enter a valid Ethereum address");
    return;
  }
  
  const providerrr = new ethers.providers.Web3Provider(window.ethereum);
  const signerrr = providerrr.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signerrr);

  try
  {
    // Call the addRoot function on the smart contract
    const transaction = await contract.addRoot(toSet);
    await transaction.wait();

    console.log("Root address set successfully!");
  }
  catch (error)
  {
    console.error("Error setting root address:", error.message || error.toString());
    alert("Error setting root address. Check the console for details.");
  }
}

async function buyService() {
  // Get the necessary values or inputs for your "Buy" function
  // For example, you might need an amount or other parameters
  
  const amount = transactionValue;
  const referrer = referrerAddress.value; 

  // Perform any additional checks if needed
  if (isNaN(amount) || amount <= 0)
  {
      alert("Please enter a valid amount");
      return;
  }

  const providerr = new ethers.providers.Web3Provider(window.ethereum);
  const signerr = providerr.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signerr);

  try
  {
      // Call the "Buy" function on the smart contract
      const transaction = await contract.Buy(referrer,{
          value: ethers.utils.parseEther(amount.toString())  // Convert amount to Wei
      });
      await transaction.wait();

      console.log("Buy function executed successfully!");
  }
  catch (error) {
      console.error("Error executing Buy function:", error.message || error.toString());
      alert("Error executing Buy function. Check the console for details.");
  }
}



// let provider= new ethers.providers.Web3Provider(window.ethereum);

// await provider.send("eth_requestAccounts",[]);

// signer=provider.getSigner();

// console.log("Account Address: ",await signer.getAddress());