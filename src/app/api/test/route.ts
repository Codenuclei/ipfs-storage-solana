import { NextRequest, NextResponse } from "next/server";
import { Stream } from "stream";
import {PublicKey, clusterApiUrl, Connection,sendAndConfirmTransaction,SystemProgram, Transaction, Keypair, TransactionInstruction} from "@solana/web3.js"
import pinataSDK from "@pinata/sdk";
const connection = new pinataSDK(
    process.env.PINATA_API_KEY,
    process.env.PINATA_SECRET_API_KEY
);
export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) {
        return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const filename = formData.get("filename") as string;
    if (!filename) {
        return NextResponse.json({ error: "Filename is required" }, { status: 400 });
    }

    // Convert File to Buffer for Pinata
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const options = {
        pinataMetadata: {
            name: filename,
        },
        pinataOptions: {
            cidVersion: 0 as 0 | 1,
        },
    };
    const web3 = new Connection(clusterApiUrl("devnet"),"confirmed");
 
    // Generate new keypair or we can use our own keypair both private key and public key
    const keypair = Keypair.generate();

    
    const recipientPubKey = new PublicKey('4VGbxoF4wJjnqugQVFaYmCUxTP6MNXfWidKHTjqry63W');


    async function storeIPFSHashOnSolana(ipfsHash: string) {
        try {
            const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
            for (let i = 0; i < 3; i++) {
                try {
                    const airdropSignature = await web3.requestAirdrop(keypair.publicKey, 100000000);
                    await web3.confirmTransaction({
                        signature: airdropSignature,
                        blockhash: (await web3.getLatestBlockhash()).blockhash,
                        lastValidBlockHeight: (await web3.getLatestBlockhash()).lastValidBlockHeight,
                    });
                    break;
                } catch (e) {
                    if (i === 2) throw e;
                    await sleep(1000);
                }
            }
    
            // Convert IPFS hash to bytes
            const ipfsHashData = Buffer.from(ipfsHash);
    
            // Create transaction with memo instruction to store IPFS hash
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: keypair.publicKey,
                    toPubkey: recipientPubKey,
                    lamports: 0,
                }),
                // Add memo instruction with IPFS hash
                new TransactionInstruction({
                    keys: [],
                    programId: new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr'),
                    data: ipfsHashData,
                })
            );
    
            const signature = await sendAndConfirmTransaction(web3, transaction, [keypair]);
            return signature;
        } catch (error: unknown) {
            console.error('Transaction error:', error);
            throw error;
        }
    }
    

  try {
    
    const readableStream = new Stream.PassThrough();
    readableStream.end(buffer);
    
    const pinataResponse = await connection.pinFileToIPFS(readableStream, options);
    const signature = await storeIPFSHashOnSolana(pinataResponse.IpfsHash);
    return NextResponse.json({ signature, ipfsHash: pinataResponse.IpfsHash });
  } catch (error) {
    console.error('IPFS upload error:', error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}