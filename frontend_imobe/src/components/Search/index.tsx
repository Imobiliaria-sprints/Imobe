import React, { FormEvent, memo, useState } from "react";
import { MdSearch } from "react-icons/md";
import styles from "./style.module.scss";

import { api } from "../../services/api";
import { AnnouncementItemList } from "./AnnouncementItemList";

export function Search() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const { data } = await api.post("announcement/search", { title: search });

    const announcements = data.map((announcement) => {
      return {
        id: announcement.id,
        title: announcement.title,
        images: announcement.images[1],
      };
    });

    setResults(announcements);
  }

  return (
    <div className={styles.search_container}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Qual tipo de imóvel você está procurando?"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            search.trim().length === 0 && setResults([]);
          }}
        />
        <button type="submit">
          <MdSearch size="20" color="#ffffff" />
        </button>
      </form>
      {results.length > 0 && search.trim() && (
        <AnnouncementItemList results={results} />
      )}
    </div>
  );
}
