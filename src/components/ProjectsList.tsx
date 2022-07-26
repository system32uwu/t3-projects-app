import { FC } from "react";
import { trpc } from "../utils/trpc";
import Grid from "./Grid";
import ProjectCard from "./ProjectCard";

interface IProps {
  userId: string;
}

const ProjectsList: FC<IProps> = ({ userId }) => {
  const projects = trpc.useQuery([
    "projects.getByUser",
    {
      userId,
      take: 6,
    },
  ]);

  const user = trpc.useQuery([
    "users.getById",
    {
      id: userId,
    },
  ]);

  return (
    <div
      className={`w-full h-full text-2xl text-blue-500 px-4 flex ${
        projects?.data && projects?.data?.length > 1
          ? "justify-start items-items"
          : "justify-center items-center"
      }`}
    >
      {projects.data && projects.data.length ? (
        <Grid cols={projects.data.length > 1 ? 2 : 1}>
          {projects.data.map((p) => (
            <ProjectCard {...p} key={p.id} />
          ))}
        </Grid>
      ) : (
        <p>
          {projects.isLoading ? (
            "Loading..."
          ) : (
            <div className="py-1 -mt-4 relative w-full">
              <div className="opacity-40 ">
                <Grid cols={2}>
                  {[0, 1, 2, 3, 4, 5].map((n) => (
                    <div
                      className="h-32 leading-6 p-4 shadow-lg rounded-2xl bg-gray-600 w-64"
                      key={n}
                    ></div>
                  ))}
                </Grid>
              </div>
              <p className="text-gray-50 font-bold italic absolute top-40 md:right-24 bg-gray-800 rounded-xl p-2 mx-4">
                {user.data?.name} has no projects
              </p>
            </div>
          )}
        </p>
      )}
    </div>
  );
};

export default ProjectsList;
