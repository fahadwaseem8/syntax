import { NextResponse } from "next/server";
import axios from "axios";
import { config } from "@/config/env";

// Add a mapping for display names to API language codes
const languageMap: { [key: string]: string } = {
  JavaScript: "nodejs",
  Python: "python",
  "C++": "c_cpp",
  Java: "java",
  Go: "golang",
};

export async function POST(request: Request) {
  try {
    const { rapidApi } = config();

    const body = await request.json();
    const { lang, code, input } = body;

    // Map the display language name to the API language code
    const apiLang = languageMap[lang];
    if (!apiLang) {
      return NextResponse.json(
        { error: "Unsupported programming language" },
        { status: 400 },
      );
    }

    const response = await axios.post(
      rapidApi.url,
      {
        langEnum: [
          "php",
          "python",
          "c",
          "c_cpp",
          "csharp",
          "kotlin",
          "golang",
          "r",
          "java",
          "typescript",
          "nodejs",
          "ruby",
          "perl",
          "swift",
          "fortran",
          "bash",
        ],
        lang: apiLang,
        code,
        input,
      },
      {
        headers: {
          "x-compile": "rapidapi",
          "X-RapidAPI-Key": rapidApi.key,
          "X-RapidAPI-Host": rapidApi.host,
        },
      },
    );

    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Forward the error message from RapidAPI
      return NextResponse.json(
        { error: error.response.data },
        { status: error.response.status },
      );
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 },
    );
  }
}
