import { toast } from "react-toastify";
import { fetchSearchOnSitesResults } from "./fetchSearchOnSitesResults";
import { searchDataOnSites, ISearchDataOnSitesProps } from "./searchDataOnSites"
import { fetchDataAlternativeTitles } from "./fetchDataAlternativeTitles";

jest.mock('./fetchDataAlternativeTitles', () => ({
  fetchDataAlternativeTitles: jest.fn(async () => {
    return Promise.resolve(['Oppenheimer', 'Оппенгеймер'])
  })
}));

jest.mock('./fetchSearchOnSitesResults', () => ({
  fetchSearchOnSitesResults: jest.fn(async () => {
    return Promise.resolve([
      {
        status: 'fulfilled',
        value: {
          items: [
            {
              title: "Watch Oppenheimer 2023 full HD on site1.com",
              snippet: "Watch Oppenheimer 2023 full HD on site1.com Free. site1.com is a Free Movies streaming site with zero ads. We let you watch movies online without having to ...",
              link: "https://site1.com/movie/oppenheimer",
              displayLink: 'site1.com',
            },
            {
              title: "Watch Oppenheimer: The Real Story 2023 full movie on site1.com",
              snippet: "Watch Oppenheimer: The Real Story 2023 full movie",
              link: "https://site1.com/movie/oppenheimer-the-real-story",
              displayLink: 'site1.com',
            },
            {
              title: "Watch Elevator 2011 full movie on site1.com",
              snippet: "Watch Elevator Online Full Movie, Elevator full hd with English subtitle.",
              link: "https://site1.com/movie/elevator",
              displayLink: 'site1.com',
            }
          ]
        }
      },
      {
        status: 'fulfilled',
        value: {
          items: [
            {
              title: "Фільм Оппенгеймер (2023) онлайн українською",
              snippet: "Оппенгеймер. Oppenheimer. Фільм 'Оппенгеймер' постер. 8.3",
              link: "https://site2.com/movie/oppenheimer",
              displayLink: 'site2.com',
            },
            {
              title: "Підбірка фільмів на реальних подіях дивись онлайн",
              snippet: "Oppenheimer. 2023 рік. 8.3. драма воєнний. Приготуйтеся до епічного кінематографічного досвіду, коли режисер Крістофер Нолан запрошує глядачів у грандіозну ...",
              link: "https://site2.com/selections/123",
              displayLink: 'site2.com',
            },
          ]
        }
      },
    ])
  })
}));

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

const mockSetSitesResults = jest.fn();
const mockSetLoading = jest.fn();

describe('searchDataOnSites', () => {
  beforeEach(() =>
    console.log('*******************')
  )
  const defaultParams: ISearchDataOnSitesProps = {
    searchApiSettings: { searchApiKey: 'test-api-key', searchEngineId: 'test-engine-id' },
    search: 'oppenheimer',
    sites: ['site1.com', 'site2.com'],
    dataId: 1,
    mediaType: 'movie',
    setSitesResults: mockSetSitesResults,
    setLoading: mockSetLoading,
    year: '2023',
    originalTitle: 'oppenheimer',
  };

  it('should handle missing API key or search engine ID', async () => {
    const paramsWithMissingApiKey = { ...defaultParams, searchApiSettings: { searchApiKey: '', searchEngineId: '' } };
    await searchDataOnSites(paramsWithMissingApiKey);
    expect(toast.error).toHaveBeenCalledWith('No google api key or engineId');
    expect(mockSetSitesResults).not.toHaveBeenCalled();
  });
  it('should throw error: Quota exceeded for: Queries per day', async () => {
    // @ts-ignore
    fetchSearchOnSitesResults.mockReturnValueOnce([{ status: 'rejected', reason: { code: 429 } }])
    await searchDataOnSites(defaultParams);
    expect(toast.error).toHaveBeenCalledWith("Quota exceeded for: 'Queries per day'", { "autoClose": 5000 });
  });
  it('should set loading to true and false', async () => {
    await searchDataOnSites(defaultParams);
    expect(mockSetLoading).toHaveBeenCalledWith(true);
    expect(mockSetLoading).toHaveBeenCalledWith(false);
  });
  it('check results for "oppenheimer"', async () => {
    await searchDataOnSites(defaultParams);
    expect(mockSetSitesResults).toHaveBeenCalledWith([
      {
        site: 'site1.com',
        result: {
          title: 'Watch Oppenheimer 2023 full HD on site1.com',
          link: 'https://site1.com/movie/oppenheimer',
        }
      },
      {
        site: 'site2.com',
        result: {
          title: 'Фільм Оппенгеймер (2023) онлайн українською',
          link: 'https://site2.com/movie/oppenheimer',
        }
      }
    ]);
  });
  it('check results for "lift"', async () => {
    // @ts-ignore
    fetchSearchOnSitesResults.mockReturnValueOnce([
      {
        status: 'fulfilled',
        value: {
          items: [
            {
              title: "Watch Lift 2024 full movie on site1.com",
              snippet: "Watch Lift 2024 full movie on site1.com. site1.com is a Free Movies streaming site with zero ads. We let you watch movies online without having to register or ...",
              link: "https://site1.com/movie/lift",
              displayLink: 'site1.com',
            },
            {
              title: "Watch Lift 2023 full movie on site1.com",
              snippet: "Lift ... Lift shines a spotlight on the invisible story of homelessness in America through the eyes of a group of young homeless and home-insecure ballet dancers ...",
              link: "https://site1.com/movie/watch-lift",
              displayLink: 'site1.com',
            },
            {
              title: "Watch Elevator 2011 full movie on site1.com",
              snippet: "Watch Elevator Online Full Movie, Elevator full hd with English subtitle.",
              link: "https://site1.com/movie/elevator",
              displayLink: 'site1.com',
            }
          ]
        }
      },
      {
        status: 'fulfilled',
        value: {
          items: [
            {
              title: "Зліт (фільм, 2024) дивитись онлайн",
              snippet: "Зліт. Lift. Фільм 'Зліт' постер. 5.5.",
              link: "https://site2.com/movie/lift",
              displayLink: 'site2.com',
            },
            {
              title: "Watch Jackdaw 2024 full HD on site2.com",
              snippet: "Lift. 2024 106m Movie. HD. Roadkill. 2024 90m Movie. HD. 13 Bombs. 2023 143m Movie. HD. Role Play. 2023 ...",
              link: "https://site2.com/movie/jackdaw",
              displayLink: 'site2.com',
            },
          ]
        }
      },
    ])
    // @ts-ignore
    fetchDataAlternativeTitles.mockReturnValueOnce(['Lift', 'Зліт']).mockReturnValue([])
    await searchDataOnSites({
      ...defaultParams,
      search: 'lift',
      originalTitle: 'lift',
      year: '2024',
    });
    expect(mockSetSitesResults).toHaveBeenCalledWith([
      {
        site: 'site1.com',
        result: {
          title: 'Watch Lift 2024 full movie on site1.com',
          link: 'https://site1.com/movie/lift',
        }
      },
      {
        site: 'site2.com',
        result: {
          title: 'Зліт (фільм, 2024) дивитись онлайн',
          link: 'https://site2.com/movie/lift',
        }
      }
    ]);
  });
  it('check results for "real steel"', async () => {
    // @ts-ignore
    fetchSearchOnSitesResults.mockReturnValueOnce([
      {
        status: 'fulfilled',
        value: {
          items: [
            {
              title: "Watch Real Steel on site1.com",
              snippet: "Watch Real Steel full movie on site1.com. site1.com is a Free Movies streaming site with zero ads. We let you watch movies online without having to register or ...",
              link: "https://site1.com/movie/real-steal",
              displayLink: 'site1.com',
            },
          ]
        }
      },
      { status: 'rejected' },
    ])
    await searchDataOnSites({
      ...defaultParams,
      search: 'real steel',
      originalTitle: 'real steel',
      year: '2011',
    });
    expect(mockSetSitesResults).toHaveBeenCalledWith([
      {
        site: 'site1.com',
        result: {
          title: 'Watch Real Steel on site1.com',
          link: 'https://site1.com/movie/real-steal',
        }
      },
      {
        site: 'site2.com',
        result: null
      },
    ]);
  });
})