"use client";

type Props = {
  name: string;
  role: string;
  img: string;
  bio?: string;
  socials?: {
    github?: string;
    linkedin?: string;
    x?: string;
    instagram?: string;
  };
};

export default function ProfileCard({ name, role, img, bio, socials }: Props) {
  const gh = socials?.github ?? "#";
  const li = socials?.linkedin ?? "#";
  const x = socials?.x ?? "#";
  const ig = socials?.instagram ?? "#";

  return (
    <div className="profile-card rounded-3xl bg-white p-6 shadow-md">
      <div className="flex flex-col items-center">
        <img
          src={img}
          alt={name}
          className="w-32 h-32 mx-auto rounded-full mb-4 object-cover border-4 border-green-100"
        />
        <h3 className="text-xl font-semibold text-green-800">{name}</h3>
        <p className="text-sm text-muted-foreground">{role}</p>

        <div className="profile-socials" aria-label={`${name} social links`}>
          <a
            href={gh}
            aria-label="GitHub"
            title="GitHub"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.03-1.41-4.03-1.41-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.77.42-1.31.76-1.6-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4 1.02 0 2.05.14 3.01.4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.47 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <a
            href={li}
            aria-label="LinkedIn"
            title="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.736 0-9.646h3.554v1.348c.42-.648 1.36-1.573 3.322-1.573 2.429 0 4.251 1.574 4.251 4.963v5.908zM5.337 8.855c-1.144 0-1.915-.762-1.915-1.715 0-.957.77-1.715 1.958-1.715 1.187 0 1.927.758 1.927 1.715 0 .953-.74 1.715-1.97 1.715zm1.946 11.597H3.392V9.806h3.891v10.646z" />
            </svg>
          </a>
          <a
            href={x}
            aria-label="X (Twitter)"
            title="X (Twitter)"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M22.46 6c-.77.35-1.6.58-2.46.69.89-.53 1.57-1.37 1.88-2.37-.83.49-1.75.85-2.72 1.05C18.2 4.2 17.06 3.75 15.82 3.75c-2.36 0-4.27 1.9-4.27 4.25 0 .33.04.66.11.97C7.69 8.83 4.07 6.9 1.64 4.1c-.36.62-.57 1.33-.57 2.09 0 1.44.73 2.71 1.84 3.46-.68-.02-1.32-.21-1.88-.52v.05c0 2.02 1.44 3.7 3.34 4.08-.35.1-.72.15-1.1.15-.27 0-.54-.03-.8-.08.54 1.68 2.1 2.9 3.95 2.94-1.45 1.13-3.28 1.8-5.27 1.8-.34 0-.68-.02-1.01-.06 1.88 1.2 4.11 1.9 6.52 1.9 7.82 0 12.1-6.7 12.1-12.52v-.57c.83-.6 1.52-1.35 2.07-2.2-.76.34-1.58.57-2.42.67" />
            </svg>
          </a>
          <a
            href={ig}
            aria-label="Instagram"
            title="Instagram"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm5 5.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5zm6.5-.5a1 1 0 1 1-1 1 1 1 0 0 1 1-1z" />
            </svg>
          </a>
        </div>

        <p className="text-gray-600 mt-4 text-center">
          {bio ?? "Active in community projects and developer initiatives."}
        </p>

        <div className="flex gap-3 mt-4">
          <a
            href="#"
            className="px-4 py-2 rounded-full bg-green-600 text-white text-sm cursor-pointer"
          >
            View profile
          </a>
          <a
            href="#"
            className="px-4 py-2 rounded-full bg-white border border-green-200 text-green-700 text-sm cursor-pointer"
          >
            Message
          </a>
        </div>
      </div>
    </div>
  );
}
