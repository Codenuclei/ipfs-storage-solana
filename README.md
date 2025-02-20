# File Upload to IPFS in Solana API

## Overview
This project allows users to upload files to IPFS (InterPlanetary File System) and interact with the Solana blockchain via API integration. It provides a seamless way to store files in a decentralized manner while leveraging Solana for transaction management.

## Features
- Upload files to IPFS using Pinata or Web3 Storage.
- Generate and retrieve IPFS hashes for uploaded files.
- Store IPFS file metadata on the Solana blockchain.
- Secure API endpoints for interaction.

## Tech Stack
- **Blockchain**: Solana
- **Storage**: IPFS (Pinata, Web3.Storage)
- **Backend**: Next.js
- **Frontend**: Next.js

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js (>= 16.x)
- npm or yarn
- Pinata API Key (or Web3.Storage API Key)

### Clone the Repository
```sh
git clone https://github.com/Codenuclei/ipfs-storage-solana.git
cd ipfs-storage-solana
```

### Install Dependencies
```sh
npm install  # or yarn install
```

### Set Up Environment Variables
Create a `.env` file and configure the following:
```
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_API_KEY=your_pinata_secret_key


```

## Usage
### Start the Server
```sh
npm run dev  # or yarn dev
```

### Upload a File to IPFS
Make a POST request to `/api/upload` with a file:
```sh
curl -X POST -F "file=@path/to/your/file" http://localhost:3000/api/upload
```

### Store Metadata on Solana
Make a POST request to `/api/store` with metadata and IPFS hash:
```sh
curl -X POST -H "Content-Type: application/json" -d '{ "ipfsHash": "your_ipfs_hash" }' http://localhost:3000/api/store
```

## API Endpoints
| Method | Endpoint      | Description                         |
|--------|--------------|-------------------------------------|
| POST   | `/api/ipfs` | Uploads a file to IPFS             |
| GET    | `/api/test`   | Test endpoint                      |


## License
This project is licensed under the MIT License.

## Contributions
Contributions are welcome! Feel free to open an issue or submit a pull request.

## Contact
For any queries, contact [abhishekghoshedu@gmail.com](mailto:abhishekghoshedu@gmail.com).

