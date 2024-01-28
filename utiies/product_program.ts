export type ESC_Product_Program = {
    "version": "0.1.0",
    "name": "product_program",
    "instructions": [
        {
            "name": "createESCOrder",
            "accounts": [
                {
                    "name": "payer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "productOrder",
                    "isMut": true,
                    "isSigner": false,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "type": "string",
                                "value": "ecommerce_solana_defi"
                            },
                            {
                                "kind": "arg",
                                "type": "u8",
                                "path": "order"
                            },
                            {
                                "kind": "account",
                                "type": "publicKey",
                                "path": "payer"
                            }
                        ]
                    }
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "name",
                    "type": "string"
                },
            ]
        }
    ],
    "accounts": [
        {
            "name": "productOrder",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "name",
                        "type": "string"
                    }
                ]
            }
        }
    ]
};

export const IDL: ESC_Product_Program = {
    "version": "0.1.0",
    "name": "product_program",
    "instructions": [
        {
            "name": "createESCOrder",
            "accounts": [
                {
                    "name": "payer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "productOrder",
                    "isMut": true,
                    "isSigner": false,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "type": "string",
                                "value": "ecommerce_solana_defi"
                            },
                            {
                                "kind": "arg",
                                "type": "u8",
                                "path": "order"
                            },
                            {
                                "kind": "account",
                                "type": "publicKey",
                                "path": "payer"
                            }
                        ]
                    }
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "name",
                    "type": "string"
                }
            ]
        }
    ],
    "accounts": [
        {
            "name": "productOrder",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "name",
                        "type": "string"
                    }
                ]
            }
        }
    ]
};