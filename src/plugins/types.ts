interface Query {
    original: string;
    show_strict_warning: boolean;
    is_navigational: boolean;
    is_news_breaking: boolean;
    spellcheck_off: boolean;
    country: string;
    bad_results: boolean;
    should_fallback: boolean;
    postal_code: string;
    city: string;
    header_country: string;
    more_results_available: boolean;
    state: string;
}

interface Profile {
    name: string;
    url: string;
    long_name: string;
    img: string;
}

interface MetaUrl {
    scheme: string;
    netloc: string;
    hostname: string;
    favicon: string;
    path: string;
}

interface Thumbnail {
    src: string;
    original: string;
    logo: boolean;
}

interface SearchResult {
    title: string;
    url: string;
    is_source_local: boolean;
    is_source_both: boolean;
    description: string;
    page_age: string;
    profile: Profile;
    language: string;
    family_friendly: boolean;
    type: string;
    subtype: string;
    is_live: boolean;
    meta_url: MetaUrl;
    thumbnail: Thumbnail;
    age: string;
    extra_snippets: string[];
}

interface MixedMain {
    type: string;
    index: number;
    all: boolean;
}

interface Mixed {
    type: string;
    main: MixedMain[];
    top: any[];
    side: any[];
}

interface Web {
    type: string;
    results: SearchResult[];
    family_friendly: boolean;
}

export interface BraveWebResponse {
    query: Query;
    mixed: Mixed;
    type: string;
    web: Web;
}

interface News {
    type: string;
    title: string;
    url: string;
    description: string;
    age: string;
    page_age: string;
    meta_url: {
        scheme: string;
        netloc: string;
        hostname: string;
        favicon: string;
        path: string;
    };
    thumbnail: {
        src: string;
    };
    extra_snippets: string[];
};

export interface BraveNewsResponse {
    type: string;
    query: Query;
    results: News[]
}