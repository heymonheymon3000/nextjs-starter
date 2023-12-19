"use client";

import { useGetUsersQuery } from "@/redux/services/userApi";
import { decrement, increment, reset } from "@/redux/features/counterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useTranslations } from "next-intl";

export default function Home() {
  const count = useAppSelector((state) => state.counterReducer.value);
  const dispatch = useAppDispatch();

  const { isLoading, isFetching, data, error } = useGetUsersQuery(null);
  const t = useTranslations("Index");

  return (
    <main className="p-[20px] max-w-[1200px] ms-auto me-auto">
      <div className="mb-16 text-center">
        <h4 className="mb-4">{count}</h4>
        <button onClick={() => dispatch(increment())}>
          {t("increment")}&nbsp;
        </button>
        <button
          onClick={() => dispatch(decrement())}
          className="ms-auto me-auto"
        >
          {t("decrement")}&nbsp;
        </button>
        <button onClick={() => dispatch(reset())}>{t("reset")}&nbsp;</button>
      </div>

      {error ? (
        <p>{t("error_message")}&nbsp;</p>
      ) : isLoading || isFetching ? (
        <p>{t("loading")}&nbsp;...</p>
      ) : data ? (
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-[20px]">
          {data.map((user) => (
            <div
              className="text-center border-solid border-[#ccc] border-[1px]"
              key={user.id}
            >
              <img
                src={`https://robohash.org/${user.id}?set=set2&size=180x180`}
                alt={user.name}
                className="h-[180px] w-[180px]"
              />
              <h3>{user.name}</h3>
            </div>
          ))}
        </div>
      ) : null}
    </main>
  );
}
