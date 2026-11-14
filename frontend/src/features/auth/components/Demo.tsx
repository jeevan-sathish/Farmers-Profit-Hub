import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const demoZodSchema = z.object({
  name: z.string().min(3, "name is required with 3character"),
  email: z.string().email("invalid email"),
  password: z.string().min(3, "min 3 required"),
});

type demoZodData = z.infer<typeof demoZodSchema>;

const Demo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<demoZodData>({
    resolver: zodResolver(demoZodSchema),
  });
  function onSubmit(data: demoZodData) {
    console.log(data);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        {...register("name", {
          required: "name is required",
          minLength: {
            value: 3,
            message: "miimum 3 character is required",
          },
        })}
        placeholder="name"
      />
      <p>{errors.name?.message}</p>
      <input type="text" {...register("email")} placeholder="email" />
      <p>{errors.email?.message}</p>
      <input type="text" {...register("password")} placeholder="password" />
      <p>{errors.password?.message}</p>
      <button type="submit">submit</button>
    </form>
  );
};

export default Demo;
