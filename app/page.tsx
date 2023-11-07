'use client';
import { Copy } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import {toast} from "@/components/ui/use-toast"


interface PunctuationsMap {
    [key: string]: string;
}
export default function Home() {
    const [output, setOutput] = useState(''); // 用于保存转换后的输出
    const inputRef = useRef<HTMLTextAreaElement>(null); // 用于访问输入文本域的引用

    const punctuationsMap:PunctuationsMap = {
        ",": "，",
        ".": "。",
        "?": "？",
        "!": "！",
        ":": "：",
        ";": "；",
        "'": "‘",
        "\"": "“",
        "(": "（",
        ")": "）",
        "[": "【",
        "]": "】",
        "{": "「",
        "}": "」",
        "-": "—",
        "&": "＆",
        "#": "＃",
        "%": "％",
        "@": "＠",
        "*": "＊",
        "$": "＄",
        "^": "＾",
        "<": "《",
        ">": "》",
        "|": "∣",
        "`": "｀",
        "~": "～",
        "/": "／",
        "\\": "＼"

    };

    // 处理文本转换的函数
    const handleConvert = () => {
        let convertedText = inputRef.current?.value || '';

        Object.keys(punctuationsMap).forEach(punc => {
            const regex = new RegExp(`\\${punc}`, 'g'); // 创建正则表达式，注意转义字符
            convertedText = convertedText.replace(regex, punctuationsMap[punc]);
        });

        setOutput(convertedText);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(output).then(() => {
            toast({
                title: "复制成功!",
            })
        }).catch(err => {
            toast({
                title: "复制失败!",
                description: err.message,
            })
        });
    };

    return (
        <main className="flex h-screen flex-row items-stretch">
            <div className="flex-1 p-4 flex flex-col">
                <Textarea placeholder="在此输入内容…" className="resize-none h-full" ref={inputRef} />
            </div>

            {/* Middle: Convert Button */}
            <div className="flex flex-col justify-center px-4">
                <Button onClick={handleConvert}>转换</Button>
            </div>

            <div className="flex-1 p-4 flex flex-col relative">
                <Textarea placeholder="输出结果将在此显示…" readOnly className="resize-none h-full" value={output} />
                <Button className="absolute top-5 right-5 bg-transparent" onClick={handleCopy}>
                    <Copy className="w-6 h-6" />
                </Button>
            </div>
        </main>
    );
}
